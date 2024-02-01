const StepThree = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="quesion" className="text-sm">
          Try asking your AI a question.
        </label>
        <input
          id="quesion"
          className="border-[1px] rounded-lg p-2"
          placeholder="type here"
        />
      </div>
      <button className="py-2 bg-primary rounded-lg text-white text-sm">
        Test search
      </button>
    </div>
  );
};
export default StepThree;
