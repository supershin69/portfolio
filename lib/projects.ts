// src/lib/projects.ts
import fs from "fs/promises";
import path from "path";

type ImageDimensions = {
  width: number;
  height: number;
};

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  fileName: string;
};

export type Project = {
  slug: string;
  title: string;
  mainImage: ProjectImage;
  images: ProjectImage[];
};

const PROJECTS_DIR = path.join(process.cwd(), "public", "projects");
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);
const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const formatTitle = (slug: string) =>
  slug
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const isImageFile = (fileName: string) => IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase());

const isMainFile = (fileName: string) => fileName.toLowerCase().startsWith("main.");

const getPngSize = (buffer: Buffer): ImageDimensions => {
  if (!buffer.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error("Invalid PNG signature.");
  }
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
};

const isJpeg = (buffer: Buffer) => buffer[0] === 0xff && buffer[1] === 0xd8;

const isJpegSofMarker = (marker: number) =>
  (marker >= 0xc0 && marker <= 0xc3) ||
  (marker >= 0xc5 && marker <= 0xc7) ||
  (marker >= 0xc9 && marker <= 0xcb) ||
  (marker >= 0xcd && marker <= 0xcf);

const getJpegSize = (buffer: Buffer): ImageDimensions => {
  if (!isJpeg(buffer)) {
    throw new Error("Invalid JPEG signature.");
  }

  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    const segmentLength = buffer.readUInt16BE(offset + 2);

    if (isJpegSofMarker(marker)) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }

    if (marker === 0xda) {
      break; // Start of scan
    }

    offset += 2 + segmentLength;
  }

  throw new Error("Could not determine JPEG size.");
};

const getImageDimensions = (buffer: Buffer, fileName: string): ImageDimensions => {
  const extension = path.extname(fileName).toLowerCase();
  if (extension === ".png") {
    return getPngSize(buffer);
  }
  if (extension === ".jpg" || extension === ".jpeg") {
    return getJpegSize(buffer);
  }
  throw new Error(`Unsupported image format: ${fileName}`);
};

const getProjectFiles = async (slug: string) => {
  const projectDir = path.join(PROJECTS_DIR, slug);
  const entries = await fs.readdir(projectDir, { withFileTypes: true });
  return entries.filter((entry) => entry.isFile()).map((entry) => entry.name);
};

const buildProjectImages = async (slug: string, files: string[]): Promise<ProjectImage[]> => {
  const sortedFiles = [...files].sort((a, b) => collator.compare(a, b));
  const mainFile = sortedFiles.find(isMainFile);
  const otherFiles = sortedFiles.filter((file) => file !== mainFile);
  const orderedFiles = mainFile ? [mainFile, ...otherFiles] : otherFiles;

  const images = await Promise.all(
    orderedFiles.map(async (fileName) => {
      const filePath = path.join(PROJECTS_DIR, slug, fileName);
      const buffer = await fs.readFile(filePath);
      const { width, height } = getImageDimensions(buffer, fileName);
      return {
        src: `/projects/${slug}/${fileName}`,
        width,
        height,
        fileName,
      };
    })
  );

  return images;
};

export const getProjectSlugs = async () => {
  const entries = await fs.readdir(PROJECTS_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => collator.compare(a, b));
};

export const getProjects = async (): Promise<Project[]> => {
  const slugs = await getProjectSlugs();
  const projects = await Promise.all(slugs.map((slug) => getProjectBySlug(slug)));
  return projects.filter((project): project is Project => Boolean(project));
};

export const getProjectBySlug = async (slug?: string | null): Promise<Project | null> => {
  if (!slug) {
    return null;
  }

  const normalizedSlug = slug.trim();
  const allSlugs = await getProjectSlugs();
  const matchedSlug =
    allSlugs.find((entry) => entry.toLowerCase() === normalizedSlug.toLowerCase()) ??
    normalizedSlug;

  let files: string[];

  try {
    files = await getProjectFiles(matchedSlug);
  } catch {
    return null;
  }

  const imageFiles = files.filter(isImageFile);
  if (imageFiles.length === 0) {
    return null;
  }

  const images = await buildProjectImages(matchedSlug, imageFiles);
  const mainImage = images.find((image) => isMainFile(image.fileName)) ?? images[0];

  if (!mainImage) {
    return null;
  }

  return {
    slug: matchedSlug,
    title: formatTitle(matchedSlug),
    mainImage,
    images,
  };
};
