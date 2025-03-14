"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalFormSchema, PersonalFormValues } from '@/lib/validations/job-listing';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData } from '@/lib/types/job-application';

interface PersonalFormProps {
  defaultValues?: Partial<FormData>;
  onSubmit: (data: FormData) => void;
}

const PersonalForm: React.FC<PersonalFormProps> = ({ defaultValues, onSubmit }) => {
  const form = useForm<PersonalFormValues>({
    resolver: zodResolver(personalFormSchema),
    defaultValues: {
      namaLengkap: defaultValues?.namaLengkap || '',
      nomorTelepon: defaultValues?.nomorTelepon || '',
      tanggalLahir: defaultValues?.tanggalLahir || '',
      jenisKelamin: (defaultValues?.jenisKelamin as "Laki - Laki" | "Perempuan") || "Laki - Laki",
      email: defaultValues?.email || '',
      jenisDisabilitas: defaultValues?.jenisDisabilitas || '',
      uploadCV: null,
      uploadSuratLamaran: null,
      uploadSertifikat: null,
    },
  });

  // Handle file inputs separately since they need special treatment
  const [cvFile, setCvFile] = React.useState<File | null>(null);
  const [lamaranFile, setLamaranFile] = React.useState<File | null>(null);
  const [sertifikatFile, setSertifikatFile] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'uploadCV' | 'uploadSuratLamaran' | 'uploadSertifikat') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      switch (fieldName) {
        case 'uploadCV':
          setCvFile(file);
          form.setValue('uploadCV', file);
          break;
        case 'uploadSuratLamaran':
          setLamaranFile(file);
          form.setValue('uploadSuratLamaran', file);
          break;
        case 'uploadSertifikat':
          setSertifikatFile(file);
          form.setValue('uploadSertifikat', file);
          break;
      }
    }
  };

  const handleSubmit = (values: PersonalFormValues) => {
    onSubmit({
      ...values,
      uploadCV: cvFile,
      uploadSuratLamaran: lamaranFile,
      uploadSertifikat: sertifikatFile
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Nama Lengkap */}
        <FormField
          control={form.control}
          name="namaLengkap"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                Nama Lengkap<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} className="h-14 rounded-lg" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Nomor Telepon */}
        <FormField
          control={form.control}
          name="nomorTelepon"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                Nomor Telepon<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} className="h-14 rounded-lg" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tanggal Lahir */}
          <FormField
            control={form.control}
            name="tanggalLahir"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Tanggal Lahir<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    placeholder="dd-mm-yyy" 
                    {...field} 
                    className="h-14 rounded-lg" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Jenis Kelamin */}
          <FormField
            control={form.control}
            name="jenisKelamin"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Jenis Kelamin<span className="text-red-500">*</span>
                </FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-14 rounded-lg">
                      <SelectValue placeholder="Pilih Jenis Kelamin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Laki - Laki">Laki - Laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* E-mail */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                E-mail<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} className="h-14 rounded-lg" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Jenis Disabilitas */}
        <FormField
          control={form.control}
          name="jenisDisabilitas"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                Jenis Disabilitas<span className="text-red-500">*</span>
              </FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="h-14 rounded-lg">
                    <SelectValue placeholder="Pilih Jenis Disabilitas" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Tuna Rungu">Tuna Rungu</SelectItem>
                  <SelectItem value="Tuna Netra">Tuna Netra</SelectItem>
                  <SelectItem value="Tuna Daksa">Tuna Daksa</SelectItem>
                  <SelectItem value="Tuna Wicara">Tuna Wicara</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upload CV */}
          <FormField
            control={form.control}
            name="uploadCV"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Upload CV<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="flex flex-col items-center">
                    <label 
                      htmlFor="cv-upload" 
                      className="flex flex-col items-center justify-center w-full h-14 border border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <span className="text-sm">Unggah</span>
                      </div>
                      <input 
                        id="cv-upload" 
                        type="file" 
                        accept=".pdf" 
                        className="hidden" 
                        onChange={(e) => handleFileChange(e, 'uploadCV')} 
                        {...fieldProps}
                      />
                    </label>
                    <p className="mt-1 text-xs text-gray-500">Gunakan format (.pdf)</p>
                    {cvFile && <p className="mt-1 text-xs text-green-600">{cvFile.name}</p>}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Upload Surat Lamaran */}
          <FormField
            control={form.control}
            name="uploadSuratLamaran"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Upload Surat Lamaran<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="flex flex-col items-center">
                    <label 
                      htmlFor="lamaran-upload" 
                      className="flex flex-col items-center justify-center w-full h-14 border border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <span className="text-sm">Unggah</span>
                      </div>
                      <input 
                        id="lamaran-upload" 
                        type="file" 
                        accept=".pdf" 
                        className="hidden" 
                        onChange={(e) => handleFileChange(e, 'uploadSuratLamaran')} 
                        {...fieldProps}
                      />
                    </label>
                    <p className="mt-1 text-xs text-gray-500">Gunakan format (.pdf)</p>
                    {lamaranFile && <p className="mt-1 text-xs text-green-600">{lamaranFile.name}</p>}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Upload Sertifikat */}
          <FormField
            control={form.control}
            name="uploadSertifikat"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Upload Sertifikat atau Lisensi
                </FormLabel>
                <FormControl>
                  <div className="flex flex-col items-center">
                    <label 
                      htmlFor="sertifikat-upload" 
                      className="flex flex-col items-center justify-center w-full h-14 border border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <span className="text-sm">Unggah</span>
                      </div>
                      <input 
                        id="sertifikat-upload" 
                        type="file" 
                        accept=".pdf" 
                        className="hidden" 
                        onChange={(e) => handleFileChange(e, 'uploadSertifikat')} 
                        {...fieldProps}
                      />
                    </label>
                    <p className="mt-1 text-xs text-gray-500">Gunakan format (.pdf)</p>
                    {sertifikatFile && <p className="mt-1 text-xs text-green-600">{sertifikatFile.name}</p>}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full md:w-auto md:float-right bg-blue-800 hover:bg-blue-900 text-white py-6 px-8 rounded-lg"
          >
            Lanjut
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PersonalForm;