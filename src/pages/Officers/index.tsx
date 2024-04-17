import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IoMdCloseCircle } from 'react-icons/io';
import {
  CreateOfficers,
  GetAllAdminsIntercom,
  GetAllRoles,
  GetCountry,
  GetOfficers,
} from '../../api/officers';
import Pagination from '../../common/Pagination';
import Breadcrumb from '../../components/Breadcrumb';
import TableOfficers from '../../components/TableOfficers';
import Modal from '../../common/Modal';
import { BsFillEyeFill } from 'react-icons/bs';
import { BsFillEyeSlashFill } from 'react-icons/bs';
import EmailAutoComplete from '../../components/EmailAutoComplete';
import Loader from '../../common/Loader';

interface AdminsType {
  items: Item[];
  meta: Meta;
  link: Link;
}
export interface Item {
  id: number;
  username: string;
  roleName: string;
  created_at: string;
  updated_at: string;
  intercomAdminId: string;
  countryAssign: string;
  active: boolean;
}
interface Meta {
  itemThisPage: number;
  totalItems: number;
  totalPage: number;
  currentPage: number;
  itemsPerPage: number;
  filters: Filters;
}
interface Filters {
  username: string;
}
interface Link {
  first: string;
  previous: any;
  next: any;
  last: string;
}

export interface AdminListType {
  adminsList: AdminsList;
}

export interface AdminsList {
  type: string;
  admins: Admin[];
}

export interface Admin {
  type: string;
  email: string;
  id: string;
  name: string;
  away_mode_enabled: boolean;
  away_mode_reassign: boolean;
  has_inbox_seat: boolean;
  team_ids: number[];
  team_priority_level: TeamPriorityLevel;
}

export interface TeamPriorityLevel {
  primary_team_ids?: number[];
}

export interface RolesType {
  id: number;
  roleName: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}

const Officers = () => {
  const [keywords, setKeywords] = useState('');
  const [meta, setMeta] = useState({
    currentPage: 1,
    itemThisPage: 10,
    itemsPerPage: 1,
    totalItems: 10,
    totalPage: 10,
  });
  const [page, setPage] = useState(1);
  const [admins, setAdmins] = useState<Item[]>([]);
  const [limit, setLimit] = useState(10);
  const [adminsIntercom, setAdminsIntercom] = useState<Admin[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [roles, setRoles] = useState<RolesType[]>([]);
  const [officersRoles, setOfficersRoles] = useState(roles[0]?.id ?? 1);
  const [country, setCountry] = useState('Thai');
  const [userEmail, setUserEmail] = useState('');
  const [intercomId, setIntercomId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const role = localStorage.getItem('role');
  const [isDisableButton, setIsDisableButton] = useState(true);
  const [countryList, setCountryList] = useState<string[]>([]);
  const handleChangeKeywords = (text: string) => {
    setKeywords(text);
  };
  const fetchAllAdmins = async () => {
    try {
      setIsLoading(true);
      const data = (await GetOfficers({
        page,
        limit,
        keywords,
      })) as AdminsType;
      if (data) {
        setAdmins(data.items);
        setMeta({
          currentPage: data.meta.currentPage,
          itemsPerPage: data.meta.itemsPerPage,
          itemThisPage: data.meta.itemThisPage,
          totalItems: data.meta.totalItems,
          totalPage: data.meta.totalPage,
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const fetchAllAdminsIntercom = async () => {
    try {
      const data = (await GetAllAdminsIntercom()) as AdminListType;
      if (data) {
        setAdminsIntercom(data.adminsList.admins);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageChange = (arg0: number) => {
    if (arg0 !== page) {
      setPage(arg0);
    }
  };
  const handleChangeLimit = (arg0: number) => {
    if (arg0 !== limit) {
      setLimit(arg0);
      setPage(1);
    }
  };
  const handleSetShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const handleSetShowConfirmPassword = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };
  const handleCloseModal = () => {
    setUserEmail('');
    setOfficersRoles(1);
    setUserEmail('');
    setIntercomId('');
    setPassword('');
    setConfirmPassword('');
    setIsDisableButton(true);
    setIsOpenModal(false);
  };
  const fetchRoles = async () => {
    try {
      const data = (await GetAllRoles()) as RolesType[];
      if (data) {
        setRoles(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCountry = async () => {
    try {
      const data = (await GetCountry()) as {
        contryProvide: string[];
      };
      setCountryList(data?.contryProvide);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  const handleFilterIntercomId = (email: string) => {
    const filterIntercomId = adminsIntercom.filter(
      (user) => user.email === email,
    )[0]?.id;

    if (filterIntercomId) {
      setIntercomId(filterIntercomId);
    } else {
      setIntercomId('');
    }
  };
  const handleCheckDisableButton = () => {
    if (
      officersRoles &&
      userEmail.trim() !== '' &&
      intercomId.trim() !== '' &&
      password.trim() !== '' &&
      country.trim() !== '' &&
      confirmPassword.trim() !== '' &&
      password === confirmPassword
    ) {
      setIsDisableButton(false);
    } else {
      setIsDisableButton(true);
    }
  };
  const onSubmitCreateNewUser = async () => {
    try {
      const payload = {
        username: userEmail,
        password: password,
        intercomAdminId: intercomId,
        roleAdminId: officersRoles,
        countryAssign: country,
      };
      const data = (await CreateOfficers(payload)) as any;
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
        setPage(1);
        handleCloseModal();
        fetchAllAdmins();
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
  const handleOpenModal = () => {
    if (role === 'admin-dev') {
      setIsOpenModal(true);
    }
  };
  useEffect(() => {
    fetchAllAdmins();
  }, [page, limit, keywords]);
  useEffect(() => {
    fetchAllAdminsIntercom();
    fetchRoles();
    fetchCountry();
  }, []);
  useEffect(() => {
    handleFilterIntercomId(userEmail);
  }, [userEmail]);
  useEffect(() => {
    handleCheckDisableButton();
  }, [
    officersRoles,
    country,
    userEmail,
    intercomId,
    password,
    confirmPassword,
  ]);

  return (
    <>
      <Breadcrumb
        mainPageName="Officers"
        mainPagePath="/officers/managemesnt"
        pageName="Management"
      />
      <div className="rounded-sm border flex flex-col gap-4 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Officers management
        </h4>
        <div className="flex flex-col gap-2 lg:flex-row lg:justify-between items-end">
          <button
            onClick={handleOpenModal}
            disabled={role !== 'admin-dev'}
            className={`${role === 'admin-dev' ? 'visible' : 'invisible'} px-4 py-2 w-full lg:w-fit h-[50px] disabled:bg-stroke bg-primary hover:bg-opacity-90 text-white rounded-lg`}
          >
            Create new officers
          </button>
          <div className=" w-full lg:w-[30%] flex flex-col gap-2">
            <label
              htmlFor="admins"
              className=" block text-black text-sm dark:text-white truncate"
            >
              Search admins with name
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
                    id="admins"
                    type="text"
                    value={keywords}
                    onChange={(e) => handleChangeKeywords(e.target.value)}
                    placeholder="Type to search admins name"
                    className="w-full bg-transparent pr-4 pl-9 focus:outline-none"
                  />
                  {keywords.trim() !== '' && (
                    <button onClick={() => setKeywords('')}>
                      <IoMdCloseCircle size={16} color="#AEB7C0" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="text-stroke" />
        {isLoading ? (
          <div className="w-full max-h-[40vh] overflow-hidden flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <TableOfficers
            data={admins}
            roles={roles}
            countryList={countryList}
            onSuccess={() => fetchAllAdmins()}
          />
        )}
        {admins.length > 0 && (
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
      <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
        <div className="flex flex-col gap-4  h-auto py-4 w-[calc(100vw_-_56px)] md:w-[500px]">
          <p className="text-lg font-medium text-black">Create new officers</p>
          <div className="flex flex-col gap-1 w-full ">
            <label className="text-body text-sm capitalize" htmlFor="email">
              email
            </label>
            <EmailAutoComplete
              inputId="email"
              emailData={adminsIntercom}
              onSelectEmail={(e) => setUserEmail(e)}
            />
          </div>
          <div className="flex gap-2 md:gap-4 justify-between">
            <div className="flex flex-col gap-1 w-[45%] md:w-full">
              <label className="text-body text-sm capitalize" htmlFor="role">
                role
              </label>
              <select
                id="role"
                onChange={(e) => setOfficersRoles(Number(e.target.value))}
                value={officersRoles}
                className="border-[1px] border-body rounded-md px-4 py-2 text-sm text-black"
              >
                {roles.map((role, index) => (
                  <option key={index} value={role.id}>
                    {role.roleName === 'admin-dev' ? 'admin' : 'officers'}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1 w-[45%] md:w-full">
              <label
                className="text-body text-sm capitalize"
                htmlFor="intercomId"
              >
                intercom id
              </label>
              <input
                id="intercomId"
                placeholder="Intercom Id"
                value={intercomId}
                disabled
                className="border-[1px] border-body bg-stroke rounded-md px-4 py-2 text-sm text-black"
                type={'text'}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-body text-sm capitalize" htmlFor="country">
              Country
            </label>
            <select
              id="country"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              className="border-[1px] border-body rounded-md px-4 py-2 text-sm text-black"
            >
              {countryList.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 relative">
            <label className="text-body text-sm capitalize" htmlFor="password">
              password
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password of officers"
              className="border-[1px] border-body rounded-md pl-4 pr-8 py-2 text-sm text-black"
              type={`${isShowPassword ? 'text' : 'password'}`}
            />
            <button
              onClick={handleSetShowPassword}
              className="absolute right-2 top-9"
            >
              {isShowPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </button>
          </div>
          <div className="flex flex-col gap-1 relative">
            <label
              className="text-body text-sm capitalize"
              htmlFor="confirmpassword"
            >
              confirm Password
            </label>
            <input
              id="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter confirm password of officers"
              className="border-[1px] border-body rounded-md pl-4 pr-8 py-2 text-sm text-black"
              type={`${isShowConfirmPassword ? 'text' : 'password'}`}
            />
            <button
              onClick={handleSetShowConfirmPassword}
              className="absolute right-2 top-9"
            >
              {isShowConfirmPassword ? (
                <BsFillEyeSlashFill />
              ) : (
                <BsFillEyeFill />
              )}
            </button>
            {confirmPassword.trim() !== '' && confirmPassword !== password && (
              <p className="text-xs text-meta-1">Passwords don't match</p>
            )}
          </div>
          <button
            disabled={isDisableButton}
            onClick={onSubmitCreateNewUser}
            className="px-4 py-2 bg-primary disabled:bg-bodydark text-white rounded-md hover:bg-opacity-90 "
          >
            Create new officers
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Officers;
