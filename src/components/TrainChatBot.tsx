import Step from '../common/Step';
import StepController from '../common/Step/StepController';
import { useState } from 'react';
import StepOne from './TrainForms/StepOne';
import StepTwo from './TrainForms/StepTwo';
import StepThree from './TrainForms/StepThree';
import { useForm, SubmitHandler } from 'react-hook-form';

export type InputLiveChatForms = {
  chunck: string;
  overlap: string;
  keyPrompt: string;
  model: string;
};

const TrainChatBot = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const maxStep = 3;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputLiveChatForms>();
  const onSubmit: SubmitHandler<InputLiveChatForms> = (data) =>
    console.log(data);
  const handleDisplayForms = (
    stepIds: number,
    register: any,
    errors: any,
    watch: any,
  ) => {
    switch (stepIds) {
      case 1:
        return <StepOne register={register} watch={watch} />;
      case 2:
        return <StepTwo register={register} errors={errors} />;
      case 3:
        return <StepThree />;
      default:
        return;
    }
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6  shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <form className="flex flex-col gap-14" onSubmit={handleSubmit(onSubmit)}>
        <div className="px-7">
          <Step
            currentStep={currentStep}
            numberOfSteps={maxStep}
            titleStep={['Fill in information', 'Select model', 'Try to ask']}
          />
        </div>
        <div>{handleDisplayForms(currentStep, register, errors, watch)}</div>
        <StepController
          maxStepsText="Save"
          maxSteps={maxStep}
          onBackStep={setCurrentStep}
          onNextStep={setCurrentStep}
          currentStep={currentStep}
        />
      </form>
    </div>
  );
};

export default TrainChatBot;
