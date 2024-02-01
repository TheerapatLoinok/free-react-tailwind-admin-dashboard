const StepOne = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="fileInput" className="text-sm">
          Please input file
        </label>

        <input id="fileInput" type={'file'} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="chunckText" className="text-sm">
          Chanck text
        </label>
        <textarea
          id="chunckText"
          className="border-[1px] rounded-lg p-2"
          placeholder="type here"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="overlapText" className="text-sm">
          Overlap
        </label>
        <textarea
          id="overlapText"
          className="border-[1px] rounded-lg p-2"
          placeholder="type here"
        />
      </div>
      <button className="py-2 bg-primary rounded-lg text-white text-sm">
        Create to vector
      </button>
      <p className="text-sm">
        You can check chunck from your files by this test.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="numberOfChunck" className="text-sm">
            Number of chunck
          </label>
          <input
            id="numberOfChunck"
            className="border-[1px] rounded-lg p-2"
            placeholder="type here"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="quesion" className="text-sm">
            Quesion
          </label>
          <input
            id="quesion"
            className="border-[1px] rounded-lg p-2"
            placeholder="type here"
          />
        </div>
      </div>
      <button className="py-2 bg-primary rounded-lg text-white text-sm">
        Test search
      </button>
    </div>
  );
};

export default StepOne;
