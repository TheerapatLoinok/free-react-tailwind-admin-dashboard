import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import Loader from './common/Loader';
import routes from './routes';
import { ToastContainer } from 'react-toastify';
import PageNotFound from './components/Errors/PageNotFound';
import ChatAI from './pages/ChatAI';
import { GetProfile } from './api/auth';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const accessToken = localStorage.getItem('access_token');

  const handleGetuseProfile = async () => {
    try {
      setLoading(true);
      const user = (await GetProfile()) as {
        username: string;
        roleName: string;
      };
      if (user) {
        localStorage.setItem('username', user.username);
        localStorage.setItem('role', user.roleName);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (accessToken && accessToken !== null) {
      handleGetuseProfile();
    }
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer />
      {accessToken === null ? (
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<ChatAI />} />
            {routes.map((routes, index) => {
              const { path, component: Component } = routes;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </>
  );
}

export default App;
