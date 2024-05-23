import Breadcrumb from '../Breadcrumb';
import { useEffect, useState } from 'react';
import {
  checkConvertFileStatus,
  convertFiletoVector,
  getSettingsModel,
} from '../../api/chatbot';
import { toast } from 'react-toastify';
import Tooltip from '../../common/ ToolTip';
import { IoHelpCircleSharp } from 'react-icons/io5';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

type Inputs = {
  files: File;
  chunkLength: string;
  chunkOverlap: string;
};

const UploadFiles = () => {
  const [isLoading, setIsLoading] = useState(false);
  const role = localStorage.getItem('role');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const getSettingDefaults = async () => {
    try {
      const data = (await getSettingsModel()) as any;
      if (data) {
        setValue('chunkLength', data.chunk ?? '');
        setValue('chunkOverlap', data.overlap ?? '');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckStatusUploadFile = async () => {
    try {
      const process = (await checkConvertFileStatus()) as {
        statusQueue: string;
      };
      if (process && process.statusQueue === 'active') {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const handleDownloadFile = () => {
    try {
      const anchor = document.createElement('a');
      anchor.style.display = 'none';
      anchor.href = `/informationIUX.txt`;
      anchor.download = 'example-files.txt';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    try {
      setIsLoading(true);
      const payload = {
        file: data?.files[0],
        chunk: data?.chunkLength,
        overlap: data?.chunkOverlap,
      };
      const responses = await convertFiletoVector(payload);
      if (responses) {
        toast.success('Processing in progress, please wait.', {
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
      setIsLoading(false);
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
    handleCheckStatusUploadFile();
  }, []);

  return (
    <>
      <Breadcrumb
        mainPageName="Setting"
        mainPagePath="/settings/uploadfiles"
        pageName="Train data"
      />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6  shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between">
          <h3 className="text-xl mb-4 font-semibold text-black">
            Upload dataset for train ai
          </h3>
          <Link to="/admin/settings/preview-data">
            <button className="px-4 py-2 border-[1px] rounded-md border-primary text-primary hover:bg-primary hover:text-white ">
              Preview data
            </button>
          </Link>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mb-2"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="uploadfile" className="text-black text-sm block">
              Attach file{' '}
              <span className="text-xs ">
                ( Only text files are supported. )
              </span>
              <span>
                {' '}
                <button
                  onClick={handleDownloadFile}
                  className="font-medium text-sm underline text-primary"
                >
                  Example files
                </button>
              </span>
            </label>
            <input
              id="uploadfile"
              type="file"
              {...register('files', { required: 'Please upload files' })}
              accept="text/plain"
              className="w-full  cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
            />
            {errors.files && (
              <p className="text-xs font-normal text-meta-1">
                {errors.files.message}
              </p>
            )}
          </div>
          {role === 'admin-dev' && (
            <>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="chunck"
                  className="text-black text-sm flex gap-2 items-center"
                >
                  Chunk length
                  <Tooltip
                    text="Maximizing the effectiveness of chunk length in data processing and analysis within AI systems to balance between granularity for accuracy and coherence for comprehension."
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
                  {...register('chunkLength', {
                    required: 'Please enter length of chunk ',
                  })}
                  onKeyPress={(event) => {
                    if (!/^\d+$/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  placeholder="Enter length of chunk"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.chunkLength && (
                  <p className="text-xs font-normal text-meta-1">
                    {errors.chunkLength.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="overlap"
                  className="flex gap-2 text-black text-sm items-center"
                >
                  Chunk overlap
                  <Tooltip
                    text={`Managing and addressing the phenomenon of chunk overlap in data processing pipelines to ensure seamless integration of information and prevent redundancy or inconsistency in analysis.`}
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
                  {...register('chunkOverlap', {
                    required: 'Please enter number of chunk overlap ',
                  })}
                  onKeyPress={(event) => {
                    if (!/^\d+$/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  placeholder="Enter number of chunk overlap"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.chunkOverlap && (
                  <p className="text-xs font-normal text-meta-1">
                    {errors.chunkOverlap.message}
                  </p>
                )}
              </div>
            </>
          )}
          {isLoading ? (
            <div className="flex flex-col gap-4 items-center py-4">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
              <p className="text-sm font-medium text-black">
                In process, You will be able to upload the file again once the
                operation is successful.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                disabled={isLoading}
                className="py-2 bg-primary disabled:bg-body disabled:bg-opacity-80 hover:bg-opacity-90 rounded-lg text-white text-sm"
              >
                Create to vector
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default UploadFiles;
