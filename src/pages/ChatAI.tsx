import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
const ChatAI = () => {
  const [question, setQuestion] = useState('');
  return (
    <>
      <Breadcrumb
        pageName="Chat AI"
        mainPageName="Chat AI"
        mainPagePath="/chat-ai"
      />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6  shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col gap-4 mb-2">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-black">
              Try to ask a question
            </h3>
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
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter questions to test"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <button
            type="button"
            disabled={question.trim() === ''}
            className="py-2 bg-primary disabled:bg-body disabled:bg-opacity-80 hover:bg-opacity-90 rounded-lg text-white text-sm"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatAI;
