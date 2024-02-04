import { useEffect, useState } from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';

export type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};
const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Change this to adjust the number of visible page numbers

    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxVisiblePages) {
      if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
        endPage = maxVisiblePages;
      } else if (currentPage + Math.floor(maxVisiblePages / 2) >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
      } else {
        startPage = currentPage - Math.floor(maxVisiblePages / 2);
        endPage = currentPage + Math.floor(maxVisiblePages / 2);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <span
          className={`w-8 p-1 flex justify-center border-[1px] rounded-md border-stroke  cursor-pointer ${i === currentPage ? 'font-bold text-black bg-opacity-80' : 'font-normal text-bodydark'}`}
          key={i}
          onClick={() => handleClick(i)}
        >
          {i}
        </span>,
      );
    }

    if (startPage > 1) {
      pageNumbers.unshift(
        <span className="flex " key="start-ellipsis">
          ...
        </span>,
      );
    }
    if (endPage < totalPages) {
      pageNumbers.push(
        <span className="flex " key="end-ellipsis">
          ...
        </span>,
      );
    }

    return pageNumbers;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  return (
    <div className="flex gap-2 h-9">
      <button
        onClick={() => handleClick(currentPage - 1)}
        className={`w-8 p-1 border-[1px] rounded-md border-stroke text-bodydark ${currentPage == 1 ? 'invisible' : 'visible'}`}
      >
        <IoChevronBackOutline size={20} />
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handleClick(currentPage + 1)}
        className={`w-8 p-1 border-[1px] rounded-md border-stroke text-bodydark ${currentPage == totalPages ? 'invisible' : 'visible'}`}
      >
        <IoChevronBackOutline className="rotate-180" size={20} />
      </button>
    </div>
  );
};

export default Pagination;
