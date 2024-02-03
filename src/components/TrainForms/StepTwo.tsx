import { IoHelpCircleSharp } from 'react-icons/io5';
import { MdModeEdit } from 'react-icons/md';
import Tooltip from '../../common/ ToolTip';

const StepTwo = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-black">
          Set key prompt and select model
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
          htmlFor="keyprompt"
          className="flex gap-2 text-black text-sm items-center"
        >
          Key prompt
          <Tooltip
            text={`"Key prompt" translates to "main text or question used to initiate a response or action in a machine learning system, typically used to generate specific responses or actions.`}
            className="bg-black p-2 text-white text-xs absolute z-10 rounded-lg top-0 -mt-7  w-[200px] h-auto"
          >
            <span>
              <IoHelpCircleSharp size={20} />
            </span>
          </Tooltip>
        </label>
        <textarea
          id="keyprompt"
          rows={6}
          placeholder="Enter key prompt"
          className="w-full rounded-lg border-[1.5px] resize-none border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        ></textarea>
      </div>
      <div className="flex flex-col gap-2">
        <label className=" flex gap-2 text-black text-sm dark:text-white">
          Model AI
          <Tooltip
            text={`"Model AI" refers to an artificial intelligence system or model used to simulate and process data automatically, enabling various tasks such as prediction, classification, or problem-solving to be performed intelligently and specifically.`}
            className="bg-black p-2 z-50 text-white text-xs absolute  rounded-lg top-0 -mt-7  w-[200px] h-auto"
          >
            <span>
              <IoHelpCircleSharp size={20} />
            </span>
          </Tooltip>
        </label>
        <div className="relative z-20 bg-white dark:bg-form-input">
          <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-4 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
            <option value="">GPT-3.5-turbo</option>
            <option value="">GPT-3.5-turbo-16k</option>
            <option value="">GPT-4</option>
          </select>
          <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                  fill="#637381"
                ></path>
              </g>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
