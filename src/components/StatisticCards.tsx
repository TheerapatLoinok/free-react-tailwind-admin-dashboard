import { ReactNode } from 'react';

type StatisticCardsProps = {
  title: string;
  value: number;
  icon: ReactNode;
  isShowPercentage: boolean;
  percentage?: string;
};

const StatisticCards = ({
  title,
  value,
  icon,
  isShowPercentage,
  percentage,
}: StatisticCardsProps) => {
  return (
    <div className="w-full rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          {icon}
        </div>
        {isShowPercentage && percentage && (
          <p className="text-title-lg text-primary font-medium">
            {percentage}%
          </p>
        )}
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-xl2 font-bold text-black dark:text-white">
            {value.toLocaleString()}
          </h4>
          <span className="text-lg font-medium">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticCards;
