import Breadcrumb from '../components/Breadcrumb';
import TrainChatBot from '../components/TrainChatBot';

const LiveChat = () => {
  return (
    <>
      <Breadcrumb mainPageName="Main" mainPagePath="/" pageName="Live Chat" />
      <TrainChatBot />
    </>
  );
};

export default LiveChat;
