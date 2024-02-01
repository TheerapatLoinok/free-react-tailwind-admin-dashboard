const StepTwo = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="textPrompt" className="text-sm">
          Key prompt
        </label>
        <textarea
          id="textPrompt"
          className="border-[1px] rounded-lg p-2"
          placeholder="type here"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="models" className="text-sm">
          Models
        </label>
        <select id="models" className="border-[1px] p-2 rounded-lg">
          <option value="a" label="A" />
          <option value="b" label="B" />
        </select>
      </div>
    </div>
  );
};

export default StepTwo;
