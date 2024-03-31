import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { chatAPI } from '../api/chatbot';
import { useForm, SubmitHandler } from 'react-hook-form';
import moment from 'moment';

type Inputs = {
  questions: string;
};

const ChatAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [uid, setUid] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (!uid || data.questions.trim() === '') return;
      setIsLoading(true);
      await chatAPI(data.questions.trim(), uid.toString());
      setIsLoading(false);
      setValue('questions', '');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const date = moment(new Date()).unix();
    setUid(date.toString());
    const socket = new WebSocket(
      `wss://ai.iuxmarkets.com/ws/message-stream?sender=${date.toString()}`,
    );
    socket.onopen = () => {
      console.log('WebSocket connection established.');
    };
    socket.onmessage = (event) => {
      if (event.data !== 'start message' && event.data !== 'end message') {
        setAnswer((prev) => prev + event.data);
      }
      if (event.data === 'end message') {
        setAnswer((prev) => prev + '\n\n');
      }
    };
    socket.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    return () => {
      socket.close();
    };
  }, []);
  return (
    <>
      <Breadcrumb
        pageName="Test chat AI"
        mainPageName="Test chat AI"
        mainPagePath="/chat-ai"
      />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6  shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col gap-4 mb-2">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-black">
              Try asking questions to check the AI's answers.
            </h3>
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                {...register('questions', {
                  required: 'Please enter questions to test',
                })}
                placeholder="Enter questions to test"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors.questions && (
                <p className="text-xs font-normal text-meta-1">
                  {errors.questions.message}
                </p>
              )}
            </div>
            {answer.trim() !== '' && (
              <div className="p-4 border-[1px] border-stroke rounded-lg duration-300 max-h-[400px] overflow-y-auto">
                <p className="whitespace-pre-line">{answer}</p>
              </div>
            )}
            <button
              disabled={isLoading}
              className="py-2 bg-primary disabled:bg-body disabled:bg-opacity-80 hover:bg-opacity-90 rounded-lg text-white text-sm"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatAI;
