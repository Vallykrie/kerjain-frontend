import { z } from "zod";

const fileSchema = z.instanceof(File)
  .refine(file => file.size <= 5 * 1024 * 1024, {
    message: "File terlalu besar. Maksimal 5MB.",
  })
  .refine(file => file.type === "application/pdf", {
    message: "Format file harus PDF.",
  });

const optionalFileSchema = z.instanceof(File)
  .refine(file => file.size <= 5 * 1024 * 1024, {
    message: "File terlalu besar. Maksimal 5MB.",
  })
  .refine(file => file.type === "application/pdf", {
    message: "Format file harus PDF.",
  })
  .optional()
  .nullable();

const phoneRegex = /^\+?62[0-9]{9,12}$/;

export const personalFormSchema = z.object({
  namaLengkap: z.string().min(2, {
    message: "Nama lengkap harus lebih dari 2 karakter.",
  }),
  nomorTelepon: z.string().refine(val => phoneRegex.test(val), {
    message: "Nomor telepon tidak valid. Gunakan format nomor Indonesia (contoh: +628123456789).",
  }),
  tanggalLahir: z.string().refine(val => {
    const date = new Date(val);
    const now = new Date();
    return date < now && date > new Date("1900-01-01");
  }, {
    message: "Tanggal lahir tidak valid.",
  }),
  jenisKelamin: z.enum(["Laki - Laki", "Perempuan"], {
    required_error: "Jenis kelamin harus dipilih.",
  }),
  email: z.string().email({
    message: "Email tidak valid.",
  }),
  jenisDisabilitas: z.string({
    required_error: "Jenis disabilitas harus dipilih.",
  }),
  uploadCV: fileSchema.nullable(),
  uploadSuratLamaran: fileSchema.nullable(),
  uploadSertifikat: optionalFileSchema,
});

export type PersonalFormValues = z.infer<typeof personalFormSchema>;