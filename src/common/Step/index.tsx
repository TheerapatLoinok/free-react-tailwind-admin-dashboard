import React from 'react';
interface StepProps {
  currentStep: number;
  numberOfSteps: number;
  titleStep: string[];
}

const Step = ({ currentStep, numberOfSteps, titleStep }: StepProps) => {
  const arrayOfStep = Array.from({ length: numberOfSteps });
  return (
    <div className="flex items-center h-auto">
      {arrayOfStep.map((_, index) => (
        <React.Fragment key={index}>
          <div className="w-10 h-10 rounded-full shrink-0 bg-black flex items-center justify-center relative">
            <p
              className={`${currentStep === index + 1 ? 'text-white' : 'text-bodydark'}`}
            >
              {index + 1}
            </p>
            <p className="absolute -bottom-5 text-xs">
              {titleStep[index] ?? `Step${index + 1}`}
            </p>
          </div>
          {index + 1 !== numberOfSteps && (
            <div className="w-[200px] bg-black h-[2px]" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Step;
