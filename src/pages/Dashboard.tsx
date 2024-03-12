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
            icon={<IoIosChatbubbles size={24} color={'#3C50E0'} />}
          />
          <StatisticCards
            title="Contact admin"
            value={statistics.AdminReply}
            icon={<MdOutlineSupportAgent size={24} color={'#3C50E0'} />}
          />
          <StatisticCards
            title="Didn't contact admin"
            value={statistics.AdminNotReply}
            icon={<FaRobot size={24} color={'#3C50E0'} />}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
