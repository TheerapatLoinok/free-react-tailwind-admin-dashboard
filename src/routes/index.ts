import { lazy } from 'react';
const Profile = lazy(() => import('../pages/Profile'));
const UploadFiles = lazy(() => import('../components/TrainForms/UploadFiles'))
const  NumberofChuncks = lazy(() => import('../components/TrainForms/NumberofChunck'))
const KeypromptandModel = lazy(() => import('../components/TrainForms/KeyPromptForm'))
const Chuncks = lazy(() => import('../pages/Chuncks'))
const ChatAI = lazy(() => import('../pages/ChatAI'))
const History = lazy(() => import('../pages/History'));
const Officers = lazy(() => import('../pages/Officers'))
const Logs = lazy(() => import('../pages/Officers/Logs'));
const Dashboard = lazy(() => import('../pages/Dashboard'))

const coreRoutes = [
  {
    path:'/dashboard',
    title:"Dashboard",
    component:Dashboard
  },
 
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
    path: '/test-chunks',
    title: 'Test Chunks',
    component: Chuncks,
  },
  {
    path: '/settings/uploadfiles',
    title: 'Upload files',
    component: UploadFiles,
  },
  {
    path: '/settings/chunks',
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
  },
  {
    path:'/officers/management',
    title:'Officers Management',
    component:Officers
  },
  {
    path:'/officers/logs',
    title:'Officers logs',
    component:Logs
  }
 
];

const routes = [...coreRoutes];
export default routes;
