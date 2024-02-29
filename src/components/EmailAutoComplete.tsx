import { useEffect, useState, useRef } from 'react';
import useClickOutside from '../hooks/useClickOutSide';
import { Admin } from '../pages/Officers';

interface EmailAutoCompleteProps {
  inputId?: string;
  emailData: Admin[];
  isReset?: boolean;
  onSelectEmail: (email: string) => void;
}

const EmailAutoComplete = ({
  inputId,
  emailData,
  isReset,
  onSelectEmail,
}: EmailAutoCompleteProps) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [options, setOptions] = useState<Admin[]>([]);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const handleChageSearch = (searchKeyword: string) => {
    setIsOpenDropdown(true);
    setSearchKeyword(searchKeyword);
  };
  const handleFilterEmail = () => {
    const filteredEmail = emailData.filter((user) =>
      user.email.toLowerCase().includes(searchKeyword.toLowerCase()),
    );
    setOptions(filteredEmail);
  };
  const handleSelectEmail = (email: string) => {
    setSearchKeyword(email);
    onSelectEmail(email);
    setIsOpenDropdown(false);
  };
  useEffect(() => {
    handleFilterEmail();
  }, [searchKeyword]);

  useEffect(() => {
    if (isReset) {
      setSearchKeyword('');
    }
  }, [isReset]);

  useClickOutside(dropdownRef, () => {
    setIsOpenDropdown(false);
  });
  return (
    <div className="relative">
      <input
        id={inputId ?? 'id'}
        autoComplete="off"
        value={searchKeyword}
        onChange={(e) => handleChageSearch(e.target.value)}
        onClick={() => setIsOpenDropdown(true)}
        placeholder="Enter officers intercom email"
        className="border-[1px] w-full border-body rounded-md px-4 py-2 text-sm text-black"
        type={'text'}
      />
      {isOpenDropdown && (
        <div
          ref={dropdownRef}
          className="z-20 rounded-lg py-2 max-h-[300px] overflow-y-scroll bg-white border-[1px] border-bodydark absolute top-10 left-0 w-full flex flex-col gap-2"
        >
          {options.length > 0 ? (
            <>
              {options.map((items, index) => (
                <button
                  onClick={() => handleSelectEmail(items.email)}
                  disabled={searchKeyword === items.email}
                  key={index}
                  className="text-sm px-4 py-2 disabled:text-bodydark hover:bg-primary hover:bg-opacity-30 text-black text-start"
                >
                  {items.email}
                </button>
              ))}
            </>
          ) : (
            <p className="text-sm text-bodydark text-start px-4 py-2">
              This email doesn't exist.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailAutoComplete;
