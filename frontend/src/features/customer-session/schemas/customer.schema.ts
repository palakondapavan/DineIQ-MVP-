import { z } from "zod";

export const customerSchema = z.object({
  customer_name: z
    .string()
    .trim()
    .min(3, "Please enter your full name")
    .max(100),

  customer_mobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid mobile number"),
});

export type CustomerFormData = z.infer<typeof customerSchema>;