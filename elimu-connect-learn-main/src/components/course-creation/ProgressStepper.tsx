/**
 * Progress Stepper Component
 * Shows current step in multi-step wizard
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div className="flex flex-col items-center relative">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                  index < currentStep
                    ? 'bg-emerald-500 text-white'
                    : index === currentStep
                    ? 'bg-emerald-500 text-white ring-4 ring-emerald-200'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index < currentStep ? (
                  <FontAwesomeIcon icon={faCheck} className="w-5 h-5" />
                ) : (
                  step.id
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={`text-sm font-medium ${
                    index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 mt-1 hidden md:block">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4 mt-[-40px]">
                <div
                  className={`h-full transition-all ${
                    index < currentStep ? 'bg-emerald-500' : 'bg-gray-200'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressStepper;

