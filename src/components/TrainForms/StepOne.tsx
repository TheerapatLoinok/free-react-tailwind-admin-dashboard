import Tooltip from '../../common/ ToolTip';
import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import { IoHelpCircleSharp } from 'react-icons/io5';
import { uploadFileTextAPI } from '../../api/chatbot';
import { toast } from 'react-toastify';
import { InputLiveChatForms } from '../TrainChatBot';

type FilesType = {
  status: number;
  message: string;
};
const StepOne = ({ register, watch }: { register: any; watch: any }) => {
  const [chunck, setChunck] = useState('');
  const [overlap, setOverlap] = useState('');
  const [files, setFiles] = useState<File>();
  const handleUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleUploadFiles(event.target.files[0]);
    }
  };
  const handleUploadFiles = async (file: File) => {
    try {
      setFiles(file);
      const files = (await uploadFileTextAPI(file)) as FilesType;
      if (files) {
        toast.success(files.message, {
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const subscription = watch((value: InputLiveChatForms) => {
      setChunck(value.chunck);
      setOverlap(value.overlap);
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-black">
          Fill in information
        </h3>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-black text-sm block">Attach file</label>
          <input
            type="file"
            accept="text/plain"
            onChange={handleUploadFile}
            className="w-full  cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="chunck"
            className="text-black text-sm flex gap-2 items-center"
          >
            Chunck
            <Tooltip
              text="Segments for processing or analysis. Each segment retains its own semantic meaning and relates to the context of the data it belongs to."
              className="bg-black p-2 text-white text-xs absolute z-10 rounded-lg top-0 -mt-7 w-[200px] h-auto"
            >
              <span>
                <IoHelpCircleSharp size={20} />
              </span>
            </Tooltip>
          </label>
          <input
            id="chunck"
            type="text"
            {...register('chunck')}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            placeholder="Enter number of chunck"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="overlap"
            className="flex gap-2 text-black text-sm items-center"
          >
            Overlap
            <Tooltip
              text={`"Overlap text" refers to text that contains some overlapping or repeated parts within the data, such as questions or messages that have similar meanings. It is important in training chatbots because it helps the chatbot learn and understand user responses more accurately and efficiently.`}
              className="bg-black p-2 text-white text-xs absolute z-10 rounded-lg top-0 -mt-7  w-[200px] h-auto"
            >
              <span>
                <IoHelpCircleSharp size={20} />
              </span>
            </Tooltip>
          </label>
          <input
            id="overlap"
            type="text"
            {...register('overlap')}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            placeholder="Enter number of overlap"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <button
          type="button"
          disabled={chunck.trim() === '' || overlap.trim() === '' || !files}
          className="py-2 bg-primary disabled:bg-body disabled:bg-opacity-80 hover:bg-opacity-90 rounded-lg text-white text-sm"
        >
          Create to vector
        </button>
      </div>
      <hr className="text-bodydark" />
      <div className="flex flex-col gap-4">
        <p className="text-lg font-semibold text-black">
          You can check chunck from your files by this test.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="numberOfChunks"
              className=" flex gap-2 text-black text-sm dark:text-white"
            >
              Number of chunck
              <Tooltip
                text={`"Number of chunk" refers to the quantity of subdivisions or parts that are divided from data or text for analysis or processing purposes.`}
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
              placeholder="Enter number of chunck"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
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
        </div>
        <button
          type="button"
          className="py-2 bg-primary hover:bg-opacity-90 rounded-lg text-white text-sm"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default StepOne;
