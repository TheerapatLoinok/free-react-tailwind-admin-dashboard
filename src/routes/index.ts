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
const Dashboard = lazy(() => import('../pages/DashBoard'))
const PreviewDataEmbed = lazy(() => import('../pages/PreviewData'))

const coreRoutes = [
  {
    path:'/admin/dashboard',
    title:"Dashboard",
    component:Dashboard
  },
 
  {
    path: '/admin/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/admin/chat-ai',
    title: 'Chat AI',
    component: ChatAI,
  },
  {
    path: '/admin/test-chunks',
    title: 'Test Chunks',
    component: Chuncks,
  },
  {
    path: '/admin/settings/uploadfiles',
    title: 'Upload files',
    component: UploadFiles,
  }, 
  {
    path: '/admin/settings/preview-data',
    title: 'Preview Data',
    component: PreviewDataEmbed,
  },
  {
    path: '/admin/settings/chunks',
    title: 'Chuncks',
    component: NumberofChuncks,
  },
  {
    path: '/admin/settings/keyprompt-and-model',
    title: 'Keyprompt and Model',
    component: KeypromptandModel,
  },
  {
    path: '/admin/history',
    title: 'History',
    component: History,
  },
  {
    path:'/admin/officers/management',
    title:'Officers Management',
    component:Officers
  },
  {
    path:'/admin/officers/logs',
    title:'Officers logs',
    component:Logs
  }
 
];

const routes = [...coreRoutes];
export default routes;
