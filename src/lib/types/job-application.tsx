export type FormStep = 'personal' | 'review';

export interface FormData {
  namaLengkap: string;
  nomorTelepon: string;
  tanggalLahir: string;
  jenisKelamin: string;
  email: string;
  jenisDisabilitas: string;
  uploadCV: File | null;
  uploadSuratLamaran: File | null;
  uploadSertifikat?: File | null;
}

export interface UploadedFile {
  fileName: string;
  filePath: string;
}

export interface FormState extends Omit<FormData, 'uploadCV' | 'uploadSuratLamaran' | 'uploadSertifikat'> {
  uploadCV: UploadedFile | null;
  uploadSuratLamaran: UploadedFile | null;
  uploadSertifikat?: UploadedFile | null;
}