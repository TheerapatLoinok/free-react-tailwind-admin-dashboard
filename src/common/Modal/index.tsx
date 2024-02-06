import { FC, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed w-screen h-screen bg-black bg-opacity-50 inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative z-99 w-auto max-w-3xl mx-auto my-6">
        <div className="relative bg-white rounded-lg outline-none focus:outline-none">
          <div className="relative flex flex-col w-full px-4 pt-10 pb-2">
            {children}
          </div>
          <button
            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg
              className="w-5 h-5 fill-current "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 11.414l4.293-4.293a1 1 0 0 1 1.414 1.414L11.414 12l4.293 4.293a1 1 0 1 1-1.414 1.414L10 13.414l-4.293 4.293a1 1 0 1 1-1.414-1.414L8.586 12 4.293 7.707a1 1 0 0 1 1.414-1.414L10 10.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 12z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="fixed inset-0 bg-black opacity-25"></div>
    </div>
  );
};

export default Modal;
