import { lazy } from 'react';
const Profile = lazy(() => import('../pages/Profile'));
const UploadFiles = lazy(() => import('../components/TrainForms/UploadFiles'))
const  NumberofChuncks = lazy(() => import('../components/TrainForms/NumberofChunck'))
const KeypromptandModel = lazy(() => import('../components/TrainForms/KeyPromptForm'))
const Chuncks = lazy(() => import('../pages/Chuncks'))
const ChatAI = lazy(() => import('../pages/ChatAI'))
const History = lazy(() => import('../pages/History'));

const coreRoutes = [
 
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/chat-ai',
    title: 'Chat AI',
    component: ChatAI,
  },
  {
    path: '/test-chuncks',
    title: 'Test Chuncks',
    component: Chuncks,
  },
  {
    path: '/settings/uploadfiles',
    title: 'Upload files',
    component: UploadFiles,
  },
  {
    path: '/settings/chuncks',
    title: 'Chuncks',
    component: NumberofChuncks,
  },
  {
    path: '/settings/keyprompt-and-model',
    title: 'Keyprompt and Model',
    component: KeypromptandModel,
  },
  {
    path: '/history',
    title: 'History',
    component: History,
  }
 
];

const routes = [...coreRoutes];
export default routes;
