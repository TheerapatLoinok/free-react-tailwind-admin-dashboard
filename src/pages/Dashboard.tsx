import StatisticCards from '../components/StatisticCards';
import { IoIosChatbubbles } from 'react-icons/io';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { FaRobot } from 'react-icons/fa6';
import { GetStatistics } from '../api/dashboard';
import { useEffect, useState } from 'react';

export interface StatisticType {
  AdminNotReply: number;
  AdminReply: number;
  total: number;
}

const Dashboard = () => {
  const [statistics, setStatistics] = useState<StatisticType>();
  const getStatistics = async () => {
    try {
      const data = (await GetStatistics()) as StatisticType;
      setStatistics(data);
    } catch (error) {
      console.log(error);
    }
  };
  const calculatePercentage = (total: number, value: number) => {
    if (total !== 0) {
      return (value / total) * 100;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      {statistics && (
        <div className="flex justify-around gap-4">
          <StatisticCards
            title="Total chat"
            value={statistics.total}
            isShowPercentage={false}
            icon={<IoIosChatbubbles size={24} color={'#3C50E0'} />}
          />
          <StatisticCards
            title="Contact admin"
            value={statistics.AdminReply}
            isShowPercentage={true}
            percentage={calculatePercentage(
              statistics?.total,
              statistics?.AdminReply,
            ).toFixed(2)}
            icon={<MdOutlineSupportAgent size={24} color={'#3C50E0'} />}
          />
          <StatisticCards
            title="Didn't contact admin"
            isShowPercentage={true}
            percentage={calculatePercentage(
              statistics?.total,
              statistics?.AdminNotReply,
            ).toFixed(2)}
            value={statistics.AdminNotReply}
            icon={<FaRobot size={24} color={'#3C50E0'} />}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
