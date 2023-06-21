import { Route, Routes } from 'react-router-dom';
import MainPage from './views/main-page/MainPage';
import MainLayout from './layouts/MainLayout';
import ShopPage from './views/shop/ShopPage';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 20000 } },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MainLayout />
        <Routes location={location}>
          <Route path="/" element={<MainPage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
      </QueryClientProvider>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    </>
  );
}

export default App;
