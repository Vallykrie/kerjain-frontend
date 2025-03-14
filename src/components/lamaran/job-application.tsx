'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronDown, ChevronRight, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';
import { useJobDetails } from '@/hooks/useJobsQuery';

// Define file upload interface
interface UploadedFile {
  file: File;
  name: string;
  preview?: string;
}

export default function JobApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  
  // Get user data from auth context
  const { user, isAuthenticated } = useAuth();
  
  // Fetch job details
  const { data: job, isLoading: jobLoading, isError: jobError } = useJobDetails(jobId);
  
  // Form input states
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [gender, setGender] = useState<string>('Laki - Laki');
  const [disabilityType, setDisabilityType] = useState<string>('Tuna Rungu');
  
  // File upload states
  const [cv, setCv] = useState<UploadedFile | null>(null);
  const [coverLetter, setCoverLetter] = useState<UploadedFile | null>(null);
  const [certificate, setCertificate] = useState<UploadedFile | null>(null);
  
  // Form state

  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Refs for file inputs
  const cvInputRef = useRef<HTMLInputElement>(null);
  const coverLetterInputRef = useRef<HTMLInputElement>(null);
  const certificateInputRef = useRef<HTMLInputElement>(null);
  
  // Check authentication status
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/jobs/' + jobId);
    }
  }, [isAuthenticated, jobId, router]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<UploadedFile | null>>,
    fieldName: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'Ukuran file maksimal 5MB'
        }));
        return;
      }
      
      // Validate file type (PDF only)
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'Hanya file PDF yang diperbolehkan'
        }));
        return;
      }
      
      setFile({
        file,
        name: file.name
      });
      
      // Clear error if any
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };
  
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!phoneNumber) {
      newErrors.phone = 'Nomor telepon diperlukan';
    }
    
    if (!dateOfBirth) {
      newErrors.dateOfBirth = 'Tanggal lahir diperlukan';
    }
    
    if (!cv) {
      newErrors.cv = 'CV diperlukan';
    }
    
    if (!coverLetter) {
      newErrors.coverLetter = 'Surat lamaran diperlukan';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Store form data in session storage for confirmation page
    const formData = {
      phoneNumber,
      dateOfBirth,
      gender,
      disabilityType,
      cvName: cv?.name,
      coverLetterName: coverLetter?.name,
      certificateName: certificate?.name,
      jobId,
      jobTitle: job?.title || ''
    };
    
    sessionStorage.setItem('jobApplicationData', JSON.stringify(formData));
    
    // Store file objects for later use
    if (cv) {
      const cvBlob = await cv.file.arrayBuffer();
      sessionStorage.setItem('cvBlob', JSON.stringify(Array.from(new Uint8Array(cvBlob))));
    }
    
    if (coverLetter) {
      const coverLetterBlob = await coverLetter.file.arrayBuffer();
      sessionStorage.setItem('coverLetterBlob', JSON.stringify(Array.from(new Uint8Array(coverLetterBlob))));
    }
    
    if (certificate) {
      const certificateBlob = await certificate.file.arrayBuffer();
      sessionStorage.setItem('certificateBlob', JSON.stringify(Array.from(new Uint8Array(certificateBlob))));
    }
    
    // Navigate to confirmation page
    router.push(`/lamaran/${jobId}/confirmation`);
  };
  
  if (jobLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-32"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (jobError || !job) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="p-4 text-center border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Lowongan tidak ditemukan</h2>
          <p className="text-gray-600 mb-4">Maaf, lowongan yang Anda cari tidak tersedia.</p>
          <Button onClick={() => router.push('/jobs')}>
            Kembali ke Pencarian
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Progress indicator */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center">
                <span className="text-sm">✓</span>
              </div>
              <span className="ml-2 text-blue-600 font-medium">Data Diri</span>
            </div>
            <div className="h-1 flex-1 bg-blue-200 mx-4"></div>
            <div className="flex items-center">
              <div className="border-2 border-blue-600 text-blue-600 rounded-full h-8 w-8 flex items-center justify-center">
                <span className="text-sm">●</span>
              </div>
              <span className="ml-2 text-gray-800 font-medium">Review</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleFormSubmit} className="bg-white rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold mb-6">Lamar Posisi {job.title}</h1>
          
          {/* Name field - readonly, from auth context */}
          <div className="mb-6">
            <Label htmlFor="fullName" className="block mb-2 text-sm font-medium">
              Nama Lengkap<span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              type="text"
              value={user?.name || ''}
              readOnly
              className="bg-gray-100"
            />
          </div>
          
          {/* Phone number */}
          <div className="mb-6">
            <Label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium">
              Nomor Telepon<span className="text-red-500">*</span>
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Masukkan nomor telepon"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Date of birth */}
            <div>
              <Label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium">
                Tanggal Lahir<span className="text-red-500">*</span>
              </Label>
              <Input
                id="dateOfBirth"
                type="text"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                placeholder="dd-mm-yyyy"
                className={errors.dateOfBirth ? "border-red-500" : ""}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
              )}
            </div>
            
            {/* Gender */}
            <div>
              <Label htmlFor="gender" className="block mb-2 text-sm font-medium">
                Jenis Kelamin<span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="Laki - Laki">Laki - Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Disability type */}
          <div className="mb-6">
            <Label htmlFor="disabilityType" className="block mb-2 text-sm font-medium">
              Jenis Disabilitas<span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <select
                id="disabilityType"
                value={disabilityType}
                onChange={(e) => setDisabilityType(e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="Tuna Rungu">Tuna Rungu</option>
                <option value="Tuna Wicara">Tuna Wicara</option>
                <option value="Tuna Daksa">Tuna Daksa</option>
                <option value="Tuna Netra">Tuna Netra</option>
                <option value="Disabilitas Mental">Disabilitas Mental</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* CV Upload */}
            <div>
              <Label htmlFor="cv" className="block mb-2 text-sm font-medium">
                Upload CV<span className="text-red-500">*</span>
              </Label>
              <input
                type="file"
                id="cv"
                ref={cvInputRef}
                onChange={(e) => handleFileChange(e, setCv, 'cv')}
                accept=".pdf"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className={`w-full justify-start ${errors.cv ? "border-red-500" : ""}`}
                onClick={() => cvInputRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                {cv ? cv.name : "Unggah"}
              </Button>
              <p className="text-xs text-gray-500 mt-1">Gunakan format (.pdf)</p>
              {errors.cv && (
                <p className="text-red-500 text-sm mt-1">{errors.cv}</p>
              )}
            </div>
            
            {/* Cover Letter Upload */}
            <div>
              <Label htmlFor="coverLetter" className="block mb-2 text-sm font-medium">
                Upload Surat Lamaran<span className="text-red-500">*</span>
              </Label>
              <input
                type="file"
                id="coverLetter"
                ref={coverLetterInputRef}
                onChange={(e) => handleFileChange(e, setCoverLetter, 'coverLetter')}
                accept=".pdf"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className={`w-full justify-start ${errors.coverLetter ? "border-red-500" : ""}`}
                onClick={() => coverLetterInputRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                {coverLetter ? coverLetter.name : "Unggah"}
              </Button>
              <p className="text-xs text-gray-500 mt-1">Gunakan format (.pdf)</p>
              {errors.coverLetter && (
                <p className="text-red-500 text-sm mt-1">{errors.coverLetter}</p>
              )}
            </div>
            
            {/* Certificate Upload */}
            <div>
              <Label htmlFor="certificate" className="block mb-2 text-sm font-medium">
                Upload Sertifikat atau Lisensi
              </Label>
              <input
                type="file"
                id="certificate"
                ref={certificateInputRef}
                onChange={(e) => handleFileChange(e, setCertificate, 'certificate')}
                accept=".pdf"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start"
                onClick={() => certificateInputRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                {certificate ? certificate.name : "Unggah"}
              </Button>
              <p className="text-xs text-gray-500 mt-1">Gunakan format (.pdf)</p>
            </div>
          </div>
          
          <div className="flex justify-end mt-8">
            <Button
              type="button"
              variant="outline"
              className="mr-4"
              onClick={() => router.back()}
            >
              Kembali
            </Button>
            <Button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white"
        
            >
              Lanjut
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}