import { IoHelpCircleSharp } from 'react-icons/io5';
import Tooltip from '../../common/ ToolTip';
import { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { getSettingsModel, setNumberofChunckAPI } from '../../api/chatbot';
import { toast } from 'react-toastify';

type SetChunckType = {
  message: string;
  statusCode: number;
};

const NumberofChuncks = () => {
  const [chuncks, setChuncks] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const handleSetChuncks = async () => {
    try {
      if (chuncks.trim() !== '') {
        setIsEdit(false);
        const data = (await setNumberofChunckAPI(
          Number(chuncks),
        )) as SetChunckType;
        if (data) {
          toast.success(data.message, {
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
      }
      return;
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
  const getSettingDefaults = async () => {
    try {
      setIsEdit(false);
      const data = (await getSettingsModel()) as any;
      if (data) {
        setChuncks(data.numberChunk ?? '');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSettingDefaults();
  }, []);
  return (
    <>
      <Breadcrumb
        pageName="Chunck"
        mainPageName="Setting"
        mainPagePath="/settings/uploadfiles"
      />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6  shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className=" flex flex-col gap-4 mb-2">
          <h3 className="text-xl font-semibold text-black">
            Set number of chunks
          </h3>
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
              value={chuncks}
              onChange={(e) => {
                setChuncks(e.target.value), setIsEdit(true);
              }}
              onKeyPress={(event) => {
                if (!/^\d+$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <button
            type="button"
            onClick={() => handleSetChuncks()}
            disabled={!isEdit}
            className="py-2 bg-primary disabled:bg-body disabled:bg-opacity-80 hover:bg-opacity-90 rounded-lg text-white text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default NumberofChuncks;
