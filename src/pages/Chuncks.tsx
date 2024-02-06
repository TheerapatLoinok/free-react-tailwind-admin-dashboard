import { IoHelpCircleSharp } from 'react-icons/io5';
import Tooltip from '../common/ ToolTip';
import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { searchContext } from '../api/chatbot';

const Chuncks = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (question.trim() === '') return;
      const data = (await searchContext(question)) as string;
      if (data) {
        setAnswer(data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <>
      <Breadcrumb
        mainPageName="Test chunck"
        mainPagePath="/chuncks"
        pageName="Test chunck"
      />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6  shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col gap-4 mb-2">
          <h3 className="text-xl font-semibold text-black">
            You can check chunck by this test.
          </h3>
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
          {isLoading ? (
            <p className="flex justify-center items-center text-sm">
              Loding...
            </p>
          ) : (
            <>
              {answer.trim() !== '' && (
                <p
                  className="max-h-[300px] overflow-y-auto p-4 border-[1px] rounded-lg border-stroke"
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              )}
            </>
          )}
          <button
            type="button"
            onClick={() => handleSubmit()}
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

export default Chuncks;
