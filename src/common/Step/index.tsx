interface StepProps {
  currentStep: number;
  //   onChangeStep: (arg0: boolean) => void;
}

const Step = ({ currentStep }: StepProps) => {
  return (
    <>
      <p>{currentStep}</p>
    </>
  );
};

export default Step;
