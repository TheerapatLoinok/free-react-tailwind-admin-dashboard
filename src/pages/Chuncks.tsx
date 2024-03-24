import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { searchContext } from '../api/chatbot';
import { useForm, SubmitHandler } from 'react-hook-form';

type ContextType = {
  cosineSimilarity: number;
  messageContext: string;
};

type Inputs = {
  questions: string;
};

const Chuncks = () => {
  const [answer, setAnswer] = useState<ContextType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      if (data.questions?.trim() === '') return;
      const response = (await searchContext(data.questions)) as ContextType[];
      setAnswer(response);
      setIsLoading(false);
      setValue('questions', '');
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
            Try ask a question to check the chunk.
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
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
            {isLoading ? (
              <p className="flex justify-center items-center text-sm">
                Loding...
              </p>
            ) : (
              <>
                {answer && answer.length > 0 && (
                  <div className='className=" max-h-[500px] overflow-y-auto flex flex-col gap-2 rounded-lg border-stroke  border-[1px]"'>
                    {answer.map((a, index) => (
                      <p
                        className="text-sm text-black p-4 bg-stroke bg-opacity-50 rounded-xl"
                        key={index}
                        dangerouslySetInnerHTML={{ __html: a.messageContext }}
                      />
                    ))}
                  </div>
                )}
              </>
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

export default Chuncks;
