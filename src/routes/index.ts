import { lazy } from 'react';

const Profile = lazy(() => import('../pages/Profile'));
const UploadFiles = lazy(() => import('../components/TrainForms/UploadFiles'))
const  NumberofChuncks = lazy(() => import('../components/TrainForms/NumberofChunck'))
const KeypromptandModel = lazy(() => import('../components/TrainForms/KeyPromptForm'))
const Chuncks = lazy(() => import('../pages/Chuncks'))
const ChatAI = lazy(() => import('../pages/ChatAI'))

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
    path: '/chuncks',
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
  }
 
];

const routes = [...coreRoutes];
export default routes;
