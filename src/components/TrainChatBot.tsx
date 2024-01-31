import Step from '../common/Step';

const TrainChatBot = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <p>this is chat bot section</p>
      <Step currentStep={1} />
    </div>
  );
};

export default TrainChatBot;
