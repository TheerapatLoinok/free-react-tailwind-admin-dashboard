import moment from 'moment';
import { Item } from '../pages/History';

interface TableHistoryProps {
  data: Item[];
}
const TableHistory = ({ data }: TableHistoryProps) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4 ">
          <div className=" p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Question ID
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Question
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Recommendations
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Date
            </h5>
          </div>
          {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Sales
            </h5>
          </div> */}
          {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Conversion
            </h5>
          </div> */}
        </div>
        {data.length > 0 ? (
          <>
            {data.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-4 border-b border-stroke dark:border-strokedark sm:grid-cols-4"
              >
                <div className="flex items-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white sm:block">
                    {item.conversationId ?? 'NaN'}
                  </p>
                </div>
                <div className="flex items-start justify-start p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">
                    {item.messageUser}
                  </p>
                </div>
                <div className="flex items-start max-h-[200px] overflow-y-auto justify-start p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">
                    {item.messageAssistance}
                  </p>
                </div>
                <div className="flex items-start justify-center p-2.5 xl:p-5">
                  <p className="text-black">
                    {moment(item.createdAt).format('MMM Do YY')}
                  </p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="grid grid-cols-4 py-4 ">
            <p className="col-span-4 flex justify-center text-sm font-medium">
              Not have data
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default TableHistory;
