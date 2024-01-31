import moment from 'moment';

interface TableHistoryProps {
  tableName: string;
}
const TableHistory = ({ tableName }: TableHistoryProps) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        {tableName}
      </h4>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Question
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Answer
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

        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-3">
          <div className="flex items-center p-2.5 xl:p-5">
            <p className="hidden text-black dark:text-white sm:block">
              What is the capital of France?
            </p>
          </div>
          <div className="flex items-center justify-start p-2.5 xl:p-5">
            <p className="text-black dark:text-white">
              The capital of France is Paris.
            </p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black">{moment().format('MMM Do YY')}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-3">
          <div className="flex items-center p-2.5 xl:p-5">
            <p className="hidden text-black dark:text-white sm:block">
              Can you explain the concept of quantum entanglement?
            </p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">
              Quantum entanglement is a phenomenon in quantum mechanics where
              two or more particles become correlated in such a way that the
              state of one particle cannot be described independently of the
              state of the others, even when they are separated by large
              distances.
            </p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black">{moment().format('MMM Do YY')}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-3">
          <div className="flex items-center p-2.5 xl:p-5">
            <p className="hidden text-black dark:text-white sm:block">
              How does the blockchain work?
            </p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">
              The blockchain is a decentralized digital ledger that records
              transactions across a network of computers. Each block contains a
              cryptographic hash of the previous block, a timestamp, and
              transaction data. Once a block is added to the chain, it is
              immutable, making the ledger secure and transparent.
            </p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black">{moment().format('MMM Do YY')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableHistory;
