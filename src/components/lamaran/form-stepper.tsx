import React from 'react';
import { cn } from '@/lib/utils';
import { FormStep } from '@/lib/types/job-application';

interface FormStepperProps {
  currentStep: FormStep;
}

const FormStepper: React.FC<FormStepperProps> = ({ currentStep }) => {
  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div 
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium",
              currentStep === 'personal' ? "bg-blue-700" : "bg-blue-500"
            )}
          >
            {currentStep === 'personal' ? '' : '✓'}
          </div>
          <span className="ml-2 font-medium text-gray-700">Data Diri</span>
        </div>
        
        <div className="flex-1 mx-4">
          <div className={cn(
            "h-1 rounded-full",
            currentStep === 'personal' ? "bg-blue-200" : "bg-blue-500"
          )}></div>
        </div>
        
        <div className="flex items-center">
          <div 
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
              currentStep === 'review' ? "bg-blue-700 text-white" : "bg-white border-2 border-gray-300 text-gray-500"
            )}
          >
            {currentStep === 'review' ? '' : ''}
          </div>
          <span className={cn(
            "ml-2 font-medium",
            currentStep === 'review' ? "text-gray-700" : "text-gray-500"
          )}>Review</span>
        </div>
      </div>
    </div>
  );
};

export default FormStepper;