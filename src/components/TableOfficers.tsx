import moment from 'moment';
import { Item, OptionsRole } from '../pages/Officers';
import { IoIosSettings } from 'react-icons/io';
import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import {
  ChangeCountryOfficers,
  ChangeRole,
  DeleteOfficers,
} from '../api/officers';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Select from 'react-select';

interface OptionsType {
  label: string;
  value: string;
}

interface TableOfficersProps {
  data: Item[];
  roles: OptionsRole[];
  countryList: OptionsType[];
  onSuccess: () => void;
}

const TableOfficers = ({
  data,
  roles,
  countryList,
  onSuccess,
}: TableOfficersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<Item | undefined>();
  const userRole = localStorage.getItem('role');
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [selectCountry, setSelectCountry] = useState<any>(null);
  const [isChange, setIsChange] = useState(false);
  const styleSelection = {
    option: (styles: any, { isFocused, isSelected, isDisabled }: any) => ({
      ...styles,
      background: isFocused ? '#fff' : isSelected ? '#FFF' : '#fff',
      zIndex: 1,
      fontSize: '14px',
      fontWeight: '400',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: isDisabled ? '#231F20' : isSelected ? '#3C50E0' : '#858693',
      cursor: 'pointer',
      '&:hover': {
        color: '#231F20',
      },
    }),

    control: (base: any) => ({
      ...base,
      '&:hover': {
        border: '1px solid #64748B',
        color: '#231F20',
      },
      height: 'auto',
      fontSize: '14px',
      fontWeight: '400',
      border: '1px solid #64748B',
      borderRadius: '8px',
    }),
  };
  const handleCloseModal = () => {
    setIsOpen(false);
    setItem(undefined);
    setIsChange(false);
  };
  const handleChangeValue = (key: string, value: string) => {
    setItem((prevItem: any) => ({
      ...prevItem,
      [key]: value,
    }));
    setIsChange(true);
  };
  const onEdit = async () => {
    try {
      if (!item) return;
      const payloadChangeRole = {
        adminId: item?.id,
        roleId: roles.filter((r) => r.label === item.roleName)[0].value,
      };

      if (item.countryAssign.length <= 0) {
        return toast.error('Country  cannot be empty', {
          position: 'bottom-left',
        });
      }
      const payloadChangeCountry = {
        adminId: item?.id,
        country: selectCountry.map((c: any) => {
          return c.value;
        }),
      };

      (await ChangeRole(payloadChangeRole)) as { message: string };
      (await ChangeCountryOfficers(payloadChangeCountry)) as {
        message: string;
      };
      toast.success('Edit officers success.', {
        position: 'bottom-left',
      });
      onSuccess();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteOffices = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();
      }
    });
  };
  const onDelete = async () => {
    try {
      if (!item) return;
      await DeleteOfficers(item?.id);
      Swal.fire({
        title: 'Deleted!',
        text: 'Your file has been deleted.',
        icon: 'success',
      });
      handleCloseModal();
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenModal = (item: Item) => {
    setIsOpen(true);
    setItem(item);
  };
  useEffect(() => {
    if (isOpen && item && roles) {
      setSelectedRole(roles.filter((role) => role.label === item.roleName)[0]);
      setSelectCountry(
        item.countryAssign.map((country: string) => {
          return countryList.filter((c) => c.value === country)[0];
        }),
      );
    } else {
      setSelectCountry(null);
      setSelectedRole(null);
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col">
      <Modal isOpen={isOpen} onClose={() => handleCloseModal()}>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4  h-auto py-4 w-[calc(100vw_-_56px)] md:w-[500px]">
            <p className="text-lg font-medium text-black">Edit officers</p>
            <div className="flex gap-2 md:gap-4 justify-between">
              <div className="flex flex-col gap-1 w-[45%] md:w-full">
                <label
                  className="text-body text-sm capitalize"
                  htmlFor="username"
                >
                  username
                </label>
                <input
                  id="username"
                  disabled
                  value={item?.username}
                  placeholder="Enter username of officers"
                  className="border-[1px] disabled:bg-stroke border-body rounded-md px-4 py-2 text-sm text-black"
                  type={'text'}
                />
              </div>
            </div>
            <div className="flex gap-2 md:gap-4 justify-between">
              <div className="flex flex-col gap-1 w-[45%] md:w-full">
                <label className="text-body text-sm capitalize" htmlFor="role">
                  role
                </label>
                {selectedRole !== null && (
                  <Select
                    options={roles}
                    defaultValue={selectedRole}
                    onChange={(e: any) => {
                      setSelectedRole(e);
                      handleChangeValue('roleName', e.label);
                    }}
                    isSearchable={false}
                    isDisabled={userRole !== 'admin-dev'}
                    isClearable={false}
                    styles={styleSelection}
                  />
                )}
              </div>
              <div className="flex flex-col gap-1 w-[45%] md:w-full">
                <label
                  className="text-body text-sm capitalize"
                  htmlFor="intercomId"
                >
                  intercom id
                </label>
                <input
                  id="username"
                  disabled
                  value={item?.intercomAdminId}
                  placeholder="Enter username of officers"
                  className="border-[1px] border-body disabled:bg-stroke rounded-md px-4 py-2 text-sm text-black"
                  type={'text'}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-body text-sm capitalize" htmlFor="country">
                Country
              </label>
              {selectCountry !== null && (
                <Select
                  options={countryList}
                  defaultValue={selectCountry}
                  onChange={(e: any) => {
                    setSelectCountry(e);
                    handleChangeValue('countryAssign', e);
                  }}
                  isDisabled={userRole !== 'admin-dev'}
                  isMulti
                  styles={styleSelection}
                />
              )}
            </div>
            <div className="flex gap-2 md:gap-4 justify-between">
              <div className="flex flex-col gap-1 w-[45%] md:w-full">
                <label
                  className="text-body text-sm capitalize"
                  htmlFor="created_at"
                >
                  Created At
                </label>
                <input
                  id="created_at"
                  disabled
                  value={moment(item?.created_at).format('MM-DD-YYYY')}
                  placeholder="Enter username of officers"
                  className="border-[1px] disabled:bg-stroke border-body rounded-md px-4 py-2 text-sm text-black"
                  type={'text'}
                />
              </div>
              <div className="flex flex-col gap-1 w-[45%] md:w-full">
                <label
                  className="text-body text-sm capitalize"
                  htmlFor="status"
                >
                  Status
                </label>
                <div className="border-[1px] bg-stroke border-body rounded-md px-4 py-2 text-sm text-black">
                  {item?.active ? (
                    <p className="text-success dark:text-white sm:block">
                      Active
                    </p>
                  ) : (
                    <p className="text-meta-1 dark:text-white sm:block">
                      Offline
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleDeleteOffices}
              disabled={userRole !== 'admin-dev'}
              className="px-4 py-2 text-sm font-medium border-[1px] rounded-md border-danger text-danger active:border-meta-1 active:text-meta-1 disabled:text-stroke disabled:border-strokes"
            >
              Delete
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleCloseModal}
                disabled={userRole !== 'admin-dev'}
                className="px-4 py-2 text-sm font-medium border-[1px] rounded-md border-black text-black active:border-opacity-80 active:text-opacity-80 disabled:text-stroke disabled:border-strokes"
              >
                Cancel
              </button>
              {userRole === 'admin-dev' && (
                <button
                  onClick={onEdit}
                  disabled={!isChange}
                  className="px-4 py-2 text-sm font-medium border-[1px] rounded-md border-success text-success active:border-meta-3 active:text-meta-3 disabled:text-opacity-45 disabled:border-opacity-45"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </Modal>
      <div className="grid grid-cols-7 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7 ">
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
        <div className="p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            Country
          </h5>
        </div>
        <div className=" p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            Created At
          </h5>
        </div>
        <div className=" p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            Action
          </h5>
        </div>
      </div>
      {data.length > 0 ? (
        <>
          {data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-7 border-b border-stroke dark:border-strokedark sm:grid-cols-7"
            >
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white sm:block">
                  {item.intercomAdminId}
                </p>
              </div>

              <div className="flex items-center p-2.5 xl:p-5">
                <p className="text-black break-all dark:text-white sm:block">
                  {item.username}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white sm:block capitalize">
                  {item.roleName === 'admin-dev' ? 'admin' : 'officers'}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                {item.active ? (
                  <p className="text-success dark:text-white sm:block">
                    Active
                  </p>
                ) : (
                  <p className="text-meta-1 dark:text-white sm:block">
                    Offline
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black items-center capitalize dark:text-white sm:block ">
                  {item.countryAssign.map((c) => {
                    return `${c} `;
                  }) ?? 'Thailand'}
                </p>
              </div>

              <div className="flex  items-center justify-center p-2.5 xl:p-5">
                <p className="text-black">
                  {moment(item.created_at).format('MMM Do YY')}
                </p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <button
                  onClick={() => {
                    handleOpenModal(item);
                  }}
                >
                  <IoIosSettings />
                </button>
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
