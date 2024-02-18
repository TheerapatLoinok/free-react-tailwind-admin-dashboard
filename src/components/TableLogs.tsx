import moment from 'moment';
import { Item } from '../pages/Officers/Logs';

const TableLogs = ({ data }: { data: Item[] }) => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5 ">
        <div className="p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            AdminID
          </h5>
        </div>
        <div className="col-span-3 p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            Details
          </h5>
        </div>
        <div className="p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">Date</h5>
        </div>
      </div>
      {data.length > 0 ? (
        <>
          {data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-5 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
            >
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white sm:block">
                  {item.adminId}
                </p>
              </div>

              <div className="col-span-3 flex items-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white sm:block">
                  {item.detail}
                </p>
              </div>

              <div className="flex items-start justify-center p-2.5 xl:p-5">
                <p className="text-black">
                  {moment(item.created_at).format('MMM Do YY')}
                </p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="grid grid-cols-3 py-4 ">
          <p className="col-span-4 flex justify-center text-sm font-medium">
            Not have data
          </p>
        </div>
      )}
    </div>
  );
};

export default TableLogs;
