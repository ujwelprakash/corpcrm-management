import { z } from "zod";

export const employeeSchema = z.object({
  // ── Personal Detail ──────────────────────────────────
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name too long"),

  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .max(15, "Phone number too long")
    .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number"),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required"),
    
  gender: z.enum(["male", "female"], {
  message: "Select a gender",
}),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(300, "Address too long"),

  // ── Company Detail ───────────────────────────────────
  employeeId: z
    .string()
    .min(1, "Employee ID is required")
    .max(20, "Employee ID too long"),

  branch: z
    .string()
    .min(1, "Select a branch"),

  department: z
    .string()
    .min(1, "Select a department"),

  designation: z
    .string()
    .min(1, "Select a designation"),

  role: z
    .string()
    .min(1, "Select a role"),

  companyJoiningDate: z
    .string()
    .min(1, "Joining date is required"),

  // ── Document ─────────────────────────────────────────
  document: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0].size <= 5 * 1024 * 1024,
      "File size must be under 5MB"
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ["application/pdf", "image/jpeg", "image/png"].includes(files[0].type),
      "Only PDF, JPG, or PNG allowed"
    ),

  // ── Bank Account Detail ──────────────────────────────
  accountHolderName: z
    .string()
    .min(2, "Account holder name is required")
    .optional()
    .or(z.literal("")),

  accountNumber: z
    .string()
    .regex(/^\d{6,20}$/, "Enter a valid account number")
    .optional()
    .or(z.literal("")),

  bankName: z
    .string()
    .min(2, "Bank name is required")
    .optional()
    .or(z.literal("")),

 bankIdentifierCode: z
  .string()
  .optional()
  .or(z.literal("")),

  branchLocation: z
    .string()
    .optional()
    .or(z.literal("")),

  taxPayerId: z
    .string()
    .optional()
    .or(z.literal("")),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;