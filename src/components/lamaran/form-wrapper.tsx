"use client";

import React, { useState } from 'react';
import PersonalForm from './personal-form';
import ReviewForm from './review-form';
import FormStepper from './form-stepper';
import { FormStep, FormData, FormState } from '@/lib/types/job-application';
import { uploadFile } from '@/lib/utils';

const FormWrapper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>('personal');
  const [formState, setFormState] = useState<FormState>({
    namaLengkap: '',
    nomorTelepon: '',
    tanggalLahir: '',
    jenisKelamin: 'Laki - Laki',
    email: '',
    jenisDisabilitas: '',
    uploadCV: null,
    uploadSuratLamaran: null,
    uploadSertifikat: null,
  });

  const handlePersonalFormSubmit = async (data: FormData) => {
    try {

      // Upload files
      const cvUpload = data.uploadCV ? await uploadFile(data.uploadCV) : null;
      const lamaranUpload = data.uploadSuratLamaran ? await uploadFile(data.uploadSuratLamaran) : null;
      const sertifikatUpload = data.uploadSertifikat ? await uploadFile(data.uploadSertifikat) : null;
      
      // Update form state
      setFormState({
        namaLengkap: data.namaLengkap,
        nomorTelepon: data.nomorTelepon,
        tanggalLahir: data.tanggalLahir,
        jenisKelamin: data.jenisKelamin,
        email: data.email,
        jenisDisabilitas: data.jenisDisabilitas,
        uploadCV: cvUpload,
        uploadSuratLamaran: lamaranUpload,
        uploadSertifikat: sertifikatUpload,
      });
      
      // Move to review step
      setCurrentStep('review');
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleBack = () => {
    setCurrentStep('personal');
  };

  const handleSubmit = async () => {
    try {
      // Here you would typically send the form data to your backend API
      // For this example, we'll just show a success toast and simulate a successful submission

      
      // Reset form and go back to first step
      // In a real app, you might redirect to a success page or dashboard
      setTimeout(() => {
        setFormState({
          namaLengkap: '',
          nomorTelepon: '',
          tanggalLahir: '',
          jenisKelamin: 'Laki - Laki',
          email: '',
          jenisDisabilitas: '',
          uploadCV: null,
          uploadSuratLamaran: null,
          uploadSertifikat: null,
        });
        setCurrentStep('personal');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <FormStepper currentStep={currentStep} />
      
      <div className="mt-8">
        {currentStep === 'personal' && (
          <PersonalForm 
            defaultValues={formState} 
            onSubmit={handlePersonalFormSubmit} 
          />
        )}
        
        {currentStep === 'review' && (
          <ReviewForm 
            formData={formState} 
            onBack={handleBack} 
            onSubmit={handleSubmit} 
          />
        )}
      </div>
    </div>
  );
};

export default FormWrapper;