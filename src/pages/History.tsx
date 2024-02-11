import { useEffect, useState } from 'react';
import { chatbotHistoryAPI } from '../api/chatbot';
import Pagination from '../common/Pagination';
import Breadcrumb from '../components/Breadcrumb';
import TableHistory from '../components/TableHistory';
import { ImBin } from 'react-icons/im';
import { IoMdCloseCircle } from 'react-icons/io';

export type FilterHistoryType = {
  page: number;
  limit: number;
  conversationId?: number;
  startDate?: string;
  endDate?: string;
};

export type HistoryType = {
  items: Item[];
  meta: Meta;
  link: Link;
};
export type Item = {
  messageUser: string;
  messageAssistance: string;
  conversationId: number;
  createdAt: string;
  updatedAt: string;
};
export type Meta = {
  itemThisPage: number;
  totalItems: number;
  totalPage: number;
  currentPage: number;
  itemsPerPage: number;
  filters: FilterHistoryType;
};
export type Link = {
  first: string;
  previous: any;
  next: any;
  last: string;
};

const History = () => {
  const [meta, setMeta] = useState({
    currentPage: 1,
    itemThisPage: 10,
    itemsPerPage: 1,
    totalItems: 10,
    totalPage: 10,
  });
  const [rowsData, setRowsData] = useState<Item[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [conversationId, setConversationId] = useState('');
  const fetchHistory = async () => {
    try {
      const params = {
        page: page,
        limit: limit,
        conversationId:
          conversationId.trim() !== '' ? Number(conversationId) : undefined,
        startDate: startDate.trim() !== '' ? startDate : undefined,
        endDate: endDate.trim() !== '' ? endDate : undefined,
      };
      const data = (await chatbotHistoryAPI(params)) as HistoryType;
      if (data) {
        setRowsData(data.items);
        setMeta({
          currentPage: data.meta.currentPage,
          itemsPerPage: data.meta.itemsPerPage,
          itemThisPage: data.meta.itemThisPage,
          totalItems: data.meta.totalItems,
          totalPage: data.meta.totalPage,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageChange = (page: number) => {
    // let filter = filterData;
    // filter.page = page;
    // setFilterData(filter);
    setPage(page);
  };
  const handleChangeLimit = (limit: number) => {
    // let filter = filterData;
    // filter.limit = limit;
    // setFilterData(filter);
    setLimit(limit);
    setPage(1);
  };
  const handleChangeStartDate = (date: string) => {
    setStartDate(date);
    setPage(1);
  };
  const handleChangeEndDate = (date: string) => {
    setEndDate(date);
    setPage(1);
  };
  const handleChangeConversation = (id: string) => {
    const inputRegex = /^[0-9\b]+$/; // Regex to allow only numbers
    if (id === '' || inputRegex.test(id)) {
      setConversationId(id);
      setPage(1);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [page, limit, startDate, endDate, conversationId]);

  console.log('rowsData :>> ', rowsData);

  return (
    <>
      <Breadcrumb mainPageName="History" mainPagePath="/" pageName="History" />
      <div className="rounded-sm border flex flex-col gap-4 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          History of asking questions to chatbots
        </h4>
        <div className="flex flex-col gap-2 lg:flex-row lg:justify-between">
          <div className="flex flex-col lg:flex-row gap-2 items-center">
            <div className="flex flex-col gap-2 w-full lg:w-[50%]">
              <label
                htmlFor="startDate"
                className=" block text-black text-sm dark:text-white"
              >
                Start Date
              </label>
              <div className="flex gap-2 ">
                <input
                  id="startDate"
                  type="date"
                  max={endDate}
                  value={startDate}
                  onChange={(e) => handleChangeStartDate(e.target.value)}
                  placeholder="Search"
                  className="rounded-lg w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {startDate.trim() !== '' && (
                  <button onClick={() => setStartDate('')}>
                    <ImBin size={16} color="#DC3545" />
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full lg:w-[50%]">
              <label
                htmlFor="endDate"
                className=" block text-black text-sm dark:text-white"
              >
                End Date
              </label>
              <div className="flex gap-2">
                <input
                  id="endDate"
                  type="date"
                  min={startDate}
                  value={endDate}
                  onChange={(e) => handleChangeEndDate(e.target.value)}
                  placeholder="Search"
                  className="rounded-lg w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {endDate.trim() !== '' && (
                  <button onClick={() => setEndDate('')}>
                    <ImBin size={16} color="#DC3545" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className=" w-full lg:w-[25%] flex flex-col gap-2">
            <label
              htmlFor="conversation"
              className=" block text-black text-sm dark:text-white truncate"
            >
              Search questions with id
            </label>
            <div className="py-3 px-5  border-[1.5px] rounded-lg border-stroke">
              <div className="relative">
                <span className="absolute top-1/2 left-0 -translate-y-1/2">
                  <svg
                    className="fill-body"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                      fill=""
                    />
                  </svg>
                </span>
                <div className="flex justify-between items-center">
                  <input
                    id="conversation"
                    type="text"
                    value={conversationId}
                    onChange={(e) => handleChangeConversation(e.target.value)}
                    placeholder="Type to search conversation id"
                    className="w-full bg-transparent pr-4 pl-9 focus:outline-none"
                  />
                  {conversationId.trim() !== '' && (
                    <button onClick={() => setConversationId('')}>
                      <IoMdCloseCircle size={16} color="#AEB7C0" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="text-stroke" />
        <TableHistory data={rowsData} />
        {rowsData.length > 0 && (
          <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between py-2">
            <div className="relative z-20 bg-white dark:bg-form-input">
              <select
                onChange={(e: any) => handleChangeLimit(e.target.value)}
                className="relative z-20 w-full lg:w-[80px] appearance-none rounded border border-stroke bg-transparent h-10 px-4 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
              <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill="#637381"
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
            <Pagination
              itemsPerPage={meta.itemsPerPage}
              totalItems={meta.totalItems}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default History;
