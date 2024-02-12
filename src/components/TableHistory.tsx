import moment from 'moment';
import { useEffect, useState } from 'react';
import { HistoryType, Item } from '../pages/History';
import Modal from '../common/Modal/index';
import { chatbotHistoryAPI } from '../api/chatbot';
import _ from 'lodash';

interface TableHistoryProps {
  data: Item[];
}
const TableHistory = ({ data }: TableHistoryProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [viewData, setViewData] = useState<Item>();
  const [singleConversation, setSingleConversation] = useState<Item[]>([]);
  const getConversationById = async () => {
    try {
      const params = {
        conversationId: viewData?.conversationId ?? 0,
        page: 1,
        limit: 99999,
      };
      const data = (await chatbotHistoryAPI(params)) as HistoryType;
      if (data) {
        setSingleConversation(_.reverse([...data.items]));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleViewData = (data: Item) => {
    if (data) {
      setIsOpenModal(true);
      setViewData(data);
    }
  };
  useEffect(() => {
    if (!viewData || viewData === undefined) {
      return;
    }
    getConversationById();
  }, [viewData]);

  return (
    <>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3 ">
          <div className=" p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Question ID
            </h5>
          </div>
          {/* <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Question
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Recommendations
            </h5>
          </div> */}
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Date
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Details
            </h5>
          </div>
        </div>
        {data.length > 0 ? (
          <>
            {data.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-3"
              >
                <div className="flex items-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white sm:block">
                    {item.conversationId ?? 'NaN'}
                  </p>
                </div>
                {/* <div className="flex items-start justify-start p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">
                    {item.messageUser}
                  </p>
                </div>
                <div className="flex items-start justify-start p-2.5 xl:p-5">
                  <p className="text-black line-clamp-2  dark:text-white">
                    {item.messageAssistance}
                  </p>
                </div> */}
                <div className="flex items-start justify-center p-2.5 xl:p-5">
                  <p className="text-black">
                    {moment(item.createdAt).format('MMM Do YY')}
                  </p>
                </div>
                <div className="flex items-start justify-center p-2.5 xl:p-5">
                  <button
                    onClick={() => handleViewData(item)}
                    className="px-4 py-2 text-white rounded-lg bg-primary text-sm hover:opacity-90"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="grid grid-cols-5 py-4 ">
            <p className="col-span-4 flex justify-center text-sm font-medium">
              Not have data
            </p>
          </div>
        )}
      </div>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <div className="flex flex-col gap-4 w-[calc(100vw_-_56px)] md:w-[500px]">
          <p className="text-sm font-semibold text-black">
            QUESTION ID :{' '}
            <span className="font-normal">
              {viewData?.conversationId ?? 'NaN'}
            </span>
          </p>
          <p className="text-sm font-semibold text-black">
            Date :{' '}
            <span className="font-normal">
              {moment(viewData?.createdAt).format('MMM Do YY')}
            </span>
          </p>
          <div className="flex flex-col gap-1 max-h-[500px]">
            <p className="text-sm font-semibold text-black">Conversation</p>
            <div className="p-2 border-[1px] border-stroke rounded-md overflow-y-auto flex flex-col gap-4">
              {singleConversation.map((conversation, index) => (
                <div key={index} className="flex flex-col gap-4">
                  <div className="self-end max-w-[80%]">
                    <p className="p-2 w-fit rounded-lg bg-primary  text-sm text-white">
                      {conversation.messageUser}
                    </p>
                  </div>
                  <div className="self-start max-w-[80%]">
                    <p className="p-2 w-fit rounded-lg bg-stroke  text-sm text-black">
                      {conversation.messageAssistance}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TableHistory;
