import Breadcrumb from '../components/Breadcrumb';
import TableHistory from '../components/TableHistory';

const History = () => {
  return (
    <>
      <Breadcrumb mainPageName="History" mainPagePath="/" pageName="History" />
      <TableHistory tableName="History of asking questions to chatbots" />
    </>
  );
};

export default History;
