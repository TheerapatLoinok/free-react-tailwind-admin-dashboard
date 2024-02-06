import Breadcrumb from '../Breadcrumb';
import { ChangeEvent, useEffect, useState } from 'react';
import { convertFiletoVector, getSettingsModel } from '../../api/chatbot';
import { toast } from 'react-toastify';
import Tooltip from '../../common/ ToolTip';
import { IoHelpCircleSharp } from 'react-icons/io5';

const UploadFiles = () => {
  const [chunck, setChunck] = useState<string>('');
  const [overlap, setOverlap] = useState<string>('');
  const [files, setFiles] = useState<File>();
  const [isEdit, setIsEdit] = useState(false);
  const handleUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFiles(event.target.files[0]);
    }
  };
  const handleCreateVector = async () => {
    try {
      if (!files) return;
      setIsEdit(false);
      const payload = {
        file: files,
        chunk: chunck,
        overlap: overlap,
      };
      const responses = await convertFiletoVector(payload);
      if (responses) {
        toast.success('Convert to vector success', {
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
    } catch (error: any) {
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
  const handleChangeChunck = (chunck: string) => {
    setChunck(chunck);
  };
  const handleChangeOverlap = (overlap: string) => {
    setOverlap(overlap);
  };
  const getSettingDefaults = async () => {
    try {
      const data = (await getSettingsModel()) as any;
      if (data) {
        setChunck(data.chunk ?? '');
        setOverlap(data.overlap ?? '');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (files && chunck !== '' && overlap !== '') {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [files, chunck, overlap]);

  useEffect(() => {
    getSettingDefaults();
  }, []);

  return (
    <>
      <Breadcrumb
        mainPageName="Setting"
        mainPagePath="/settings/uploadfiles"
        pageName="Train data"
      />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6  shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h3 className="text-xl mb-4 font-semibold text-black">
          Upload files for train AI
        </h3>
        <div className="flex flex-col gap-4 mb-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="uploadfile" className="text-black text-sm block">
              Attach file
            </label>
            <input
              id="uploadfile"
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
              value={chunck}
              onChange={(e) => handleChangeChunck(e.target.value)}
              onKeyPress={(event) => {
                if (!/^\d+$/.test(event.key)) {
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
              value={overlap}
              onChange={(e) => handleChangeOverlap(e.target.value)}
              onKeyPress={(event) => {
                if (!/^\d+$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              placeholder="Enter number of overlap"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <button
            type="button"
            onClick={() => handleCreateVector()}
            disabled={!isEdit}
            className="py-2 bg-primary disabled:bg-body disabled:bg-opacity-80 hover:bg-opacity-90 rounded-lg text-white text-sm"
          >
            Create to vector
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadFiles;
