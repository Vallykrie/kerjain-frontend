"use client";

import React from 'react';
import { FormState } from '@/lib/types/job-application';
import ReviewDataSection from './review-data-section';
import ReviewDocumentsSection from './review-documents-section';
import ReviewActions from './review-actions';

interface ReviewFormProps {
  formData: FormState;
  onBack: () => void;
  onSubmit: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ formData, onBack, onSubmit }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <ReviewDataSection formData={formData} onEdit={onBack} />
        <ReviewDocumentsSection formData={formData} />
      </div>
      
      <ReviewActions onBack={onBack} onSubmit={onSubmit} />
    </div>
  );
};

export default ReviewForm;