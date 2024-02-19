import moment from 'moment';
import { Item } from '../pages/Officers';

interface TableOfficersProps {
  data: Item[];
  activeUserId: string;
  isDisableAssignment?: boolean;
  onAssign: (id: string) => void;
}

const TableOfficers = ({
  data,
  activeUserId,
  isDisableAssignment = false,
  onAssign,
}: TableOfficersProps) => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5 ">
        <div className="text-center p-2.5 xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">Id</h5>
        </div>

        <div className="p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            Username
          </h5>
        </div>
        <div className="p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">Role</h5>
        </div>
        <div className="p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            Status
          </h5>
        </div>
        <div className=" p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            Created At
          </h5>
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
                  {item.intercomAdminId}
                </p>
              </div>

              <div className="flex items-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white sm:block">
                  {item.username}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white sm:block">
                  {item.roleName}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                {item.intercomAdminId === activeUserId ? (
                  <p className="text-success dark:text-white sm:block">
                    Assigned
                  </p>
                ) : (
                  <button
                    disabled={isDisableAssignment}
                    onClick={() => onAssign(item.intercomAdminId)}
                    className="text-white bg-primary disabled:bg-body px-4 py-2 rounded-lg hover:bg-opacity-90"
                  >
                    Assign
                  </button>
                )}
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

export default TableOfficers;
