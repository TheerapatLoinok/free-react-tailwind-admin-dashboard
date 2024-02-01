interface StepControllerProps {
  currentStep: number;
  maxSteps: number;
  onNextStep: (step: number) => void;
  onBackStep: (step: number) => void;
}

const StepController = ({
  currentStep,
  onBackStep,
  onNextStep,
  maxSteps,
}: StepControllerProps) => {
  const handleInCreaseStep = () => {
    if (currentStep < maxSteps) {
      onNextStep(currentStep + 1);
    }
  };
  const handleDecreaseStep = () => {
    if (currentStep > 1) {
      onBackStep(currentStep - 1);
    }
  };
  return (
    <div className="flex justify-between w-full">
      <button
        onClick={handleDecreaseStep}
        disabled={currentStep <= 1}
        className={`py-2 px-4 bg-bodydark text-white rounded-lg ${currentStep > 1 ? 'visible' : 'invisible'}`}
      >
        Back
      </button>
      <button
        onClick={handleInCreaseStep}
        disabled={currentStep === maxSteps}
        className="py-2 px-4 bg-primary text-white rounded-lg self-end"
      >
        Next
      </button>
    </div>
  );
};

export default StepController;
