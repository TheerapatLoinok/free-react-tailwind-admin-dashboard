import { IoHelpCircleSharp } from 'react-icons/io5';
import Tooltip from '../../common/ ToolTip';
import { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { getSettingsModel, setNumberofChunckAPI } from '../../api/chatbot';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';

type SetChunckType = {
  message: string;
  statusCode: number;
};

type Inputs = {
  chunkLimit: string;
};

const NumberofChuncks = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState(false);
  const getSettingDefaults = async () => {
    try {
      const data = (await getSettingsModel()) as any;
      if (data) {
        setValue('chunkLimit', data.numberChunk ?? '');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      const res = (await setNumberofChunckAPI(
        Number(data.chunkLimit),
      )) as SetChunckType;
      if (res) {
        toast.success(res.message, {
          position: 'bottom-left',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
      setIsLoading(false);
      return;
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.response.data.message, {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };
  useEffect(() => {
    getSettingDefaults();
  }, []);
  return (
    <>
      <Breadcrumb
        pageName="Chunk response"
        mainPageName="Setting"
        mainPagePath="/settings/uploadfiles"
      />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6  shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className=" flex flex-col gap-4 mb-2">
          <h3 className="text-xl font-semibold text-black">
            Customizing AI response chunk
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="numberOfChunks"
                className=" flex gap-2 text-black text-sm dark:text-white"
              >
                Number of chuck response
                <Tooltip
                  text={`Specify the number of chunks for AI responses, enabling control over the granularity and length of information provided for better comprehension and usability.`}
                  className="bg-black p-2 text-white text-xs absolute z-10 rounded-lg top-0 -mt-7  w-[200px] h-auto"
                >
                  <span>
                    <IoHelpCircleSharp size={20} />
                  </span>
                </Tooltip>
              </label>
              <input
                id="numberOfChunks"
                type="text"
                placeholder="Enter number of chunk"
                {...register('chunkLimit', {
                  required: 'Please enter number of chunk',
                })}
                onKeyPress={(event) => {
                  if (!/^\d+$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors.chunkLimit && (
                <p className="text-xs font-normal text-meta-1">
                  {errors.chunkLimit.message}
                </p>
              )}
            </div>
            <button
              disabled={isLoading}
              className="py-2 bg-primary disabled:bg-body disabled:bg-opacity-80 hover:bg-opacity-90 rounded-lg text-white text-sm"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NumberofChuncks;
