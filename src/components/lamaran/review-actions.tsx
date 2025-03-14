"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

interface ReviewActionsProps {
  onBack: () => void;
  onSubmit: () => void;
}

const ReviewActions: React.FC<ReviewActionsProps> = ({ onBack, onSubmit }) => {
  return (
    <div className="flex justify-between pt-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onBack} 
        className="flex items-center border-gray-300 text-gray-700 py-6 px-8 rounded-lg"
      >
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
          className="mr-2"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        Kembali
      </Button>
      
      <Button 
        type="button" 
        onClick={onSubmit} 
        className="bg-blue-800 hover:bg-blue-900 text-white py-6 px-8 rounded-lg"
      >
        Kirim
      </Button>
    </div>
  );
};

export default ReviewActions;