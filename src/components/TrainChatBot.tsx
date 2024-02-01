import Step from '../common/Step';
import StepController from '../common/Step/StepController';
import { useState } from 'react';
import StepOne from './TrainForms/StepOne';
import StepTwo from './TrainForms/StepTwo';
import StepThree from './TrainForms/StepThree';

const TrainChatBot = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const maxStep = 3;
  const handleDisplayForms = (stepIds: number) => {
    switch (stepIds) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      default:
        return;
    }
  };
  return (
    <section className="rounded-sm border flex flex-col gap-10 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <Step
        currentStep={currentStep}
        numberOfSteps={maxStep}
        titleStep={['Step1', 'Step2', 'Step3']}
      />
      <section>{handleDisplayForms(currentStep)}</section>
      <StepController
        maxSteps={maxStep}
        onBackStep={setCurrentStep}
        onNextStep={setCurrentStep}
        currentStep={currentStep}
      />
    </section>
  );
};

export default TrainChatBot;
