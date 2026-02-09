// src/components/ContactForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { sendEmail } from "@/actions/sendEmail"; // Import the server action

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [serverStatus, setServerStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setServerStatus(null); // Reset status
    
    // Call the Server Action
    const result = await sendEmail(data);

    if (result.success) {
      setServerStatus({ success: true, message: result.message });
      reset(); // Clear form on success
    } else {
      setServerStatus({ success: false, message: result.message });
    }
  };

  return (
    <section id="contact" className="py-20 bg-black text-white">
      <div className="container mx-auto px-6 max-w-2xl">
        <h2 className="text-4xl font-bold mb-10 text-center border-b-4 border-white inline-block pb-2">
          Contact Me
        </h2>

        {/* Success/Error Feedback Message */}
        {serverStatus && (
          <div
            className={`mb-6 p-4 rounded text-center ${
              serverStatus.success
                ? "bg-green-900/50 text-green-200 border border-green-700"
                : "bg-red-900/50 text-red-200 border border-red-700"
            }`}
          >
            {serverStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <input
                {...register("name")}
                placeholder="Name"
                className={`w-full bg-[#1d1d1d] border-l-4 focus:border-white p-4 outline-none transition-colors ${
                  errors.name ? "border-red-500" : "border-transparent"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <input
                {...register("email")}
                placeholder="Email"
                className={`w-full bg-[#1d1d1d] border-l-4 focus:border-white p-4 outline-none transition-colors ${
                  errors.email ? "border-red-500" : "border-transparent"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <input
              {...register("phone")}
              placeholder="Phone Number"
              className={`w-full bg-[#1d1d1d] border-l-4 focus:border-white p-4 outline-none transition-colors ${
                errors.phone ? "border-red-500" : "border-transparent"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register("message")}
              placeholder="Your Message"
              rows={5}
              className={`w-full bg-[#1d1d1d] border-l-4 focus:border-white p-4 outline-none transition-colors ${
                errors.message ? "border-red-500" : "border-transparent"
              }`}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-10 py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}