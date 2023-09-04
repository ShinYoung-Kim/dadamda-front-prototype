import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import ScrapPage from './pages/ScrapPage';
import Header from './components/molcules/Header';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';
import TrendingPage from './pages/TrendingPage';
import BoardPage from './pages/BoardPage';
import GoogleOAuthLoginpage from './pages/GoogleOAuthLoginPage.tsx';
import { LoginProvider, RequireAuth } from './context/LoginContext.tsx';
import ScrapTemplate from './components/templates/ScrapTemplate.tsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.tsx';
import { SnackbarProvider } from 'notistack';
import NotReadyTemplate from './components/templates/NotReadyTemplate.tsx';
import { worker } from './mocks/worker.ts';
import ErrorHandler from './utility/ErrorHandler.tsx';
import { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import theme from './assets/styles/themeMuiStyle.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// if (process.env.NODE_ENV === 'development') {
//   // develop 환경에서만 사용
//   worker.start();
// }

const queryClient = new QueryClient();

function App() {
  const [error, setError] = useState<string | null>(null);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <LoginProvider>
              <BrowserRouter>
                <Header />
                {error && <ErrorHandler error={error} setError={setError} />}
                <Routes>
                  <Route path='/' element={<MainPage />}></Route>
                  <Route path='/main' element={<MainPage />}></Route>
                  <Route path='/user' element={<RequireAuth><UserPage setError={setError} /></RequireAuth>}></Route>
                  <Route path='/scrap' element={<RequireAuth><ScrapPage /></RequireAuth>}>
                    <Route path='list' element={<ScrapTemplate type={'list'} />}></Route>
                    <Route path='article' element={<ScrapTemplate type={'article'} />}></Route>
                    <Route path='product' element={<ScrapTemplate type={'product'} />}></Route>
                    <Route path='video' element={<ScrapTemplate type={'video'} />}></Route>
                    <Route path='location' element={<ScrapTemplate type={'location'} />}></Route>
                    <Route path='other' element={<ScrapTemplate type={'other'} />}></Route>
                    <Route index element={<ScrapTemplate type={'list'} />}></Route>
                  </Route>
                  <Route path='/board' element={<RequireAuth><BoardPage /></RequireAuth>}>
                    <Route index element={<NotReadyTemplate />} />
                  </Route>
                  <Route path='/trending' element={<TrendingPage />}></Route>
                  <Route path='/google-login' element={<GoogleOAuthLoginpage />}></Route>
                  <Route path='/privacy' element={<PrivacyPolicyPage />}></Route>
                </Routes>
              </BrowserRouter>
              <ReactQueryDevtools initialIsOpen={false} />
            </LoginProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider >
    </>
  )
}

export default App;
