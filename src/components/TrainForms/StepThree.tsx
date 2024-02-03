import { MdModeEdit } from 'react-icons/md';

const StepThree = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-black">
          Try to ask a question
        </h3>
        <div className="flex gap-4">
          <button className="text-sm font-medium px-2 py-1 text-black border-[1px] border-black rounded-lg">
            Cancel
          </button>
          <button className="text-sm font-medium px-2 py-1 text-danger border-[1px] border-b-danger rounded-lg flex gap-2 items-center">
            <MdModeEdit />
            Edit
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="question"
          className=" block text-black text-sm dark:text-white"
        >
          Questions to test
        </label>
        <input
          id="question"
          type="text"
          placeholder="Enter questions to test"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
      </div>
      <button className="py-2 bg-primary rounded-lg hover:bg-opacity-90 text-white text-sm">
        Test search
      </button>
    </div>
  );
};
export default StepThree;
