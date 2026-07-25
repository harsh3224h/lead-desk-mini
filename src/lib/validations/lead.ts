import { z } from "zod";

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .trim()
    .toLowerCase(),
  budget: z.enum(["<$1k", "$1k-$5k", "$5k-$10k", "$10k+"], {
    message: "Please select a budget range",
  }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters")
    .trim(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export const budgetOptions = [
  { value: "<$1k", label: "Less than $1,000" },
  { value: "$1k-$5k", label: "$1,000 – $5,000" },
  { value: "$5k-$10k", label: "$5,000 – $10,000" },
  { value: "$10k+", label: "$10,000+" },
] as const;
