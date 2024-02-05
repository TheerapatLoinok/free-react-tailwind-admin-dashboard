interface StepControllerProps {
  currentStep: number;
  maxSteps: number;
  maxStepsText: string;
  onNextStep: (step: number) => void;
  onBackStep: (step: number) => void;
}

const StepController = ({
  currentStep,
  onBackStep,
  onNextStep,
  maxSteps,
  maxStepsText,
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
    <div className="flex justify-between w-full py-3">
      <button
        type="button"
        onClick={handleDecreaseStep}
        disabled={currentStep <= 1}
        className={`py-2 px-4 bg-black hover:bg-opacity-90 text-white rounded-lg ${currentStep > 1 ? 'visible' : 'invisible'}`}
      >
        Back
      </button>
      {currentStep === maxSteps ? (
        <button
          type="submit"
          // disabled={currentStep === maxSteps}
          className="py-2 px-4 bg-primary hover:bg-opacity-90 text-white rounded-lg self-end"
        >
          {maxStepsText}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleInCreaseStep}
          disabled={currentStep === maxSteps}
          className="py-2 px-4 bg-primary hover:bg-opacity-90 text-white rounded-lg self-end"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default StepController;
