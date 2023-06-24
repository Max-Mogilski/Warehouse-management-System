import { Route, Routes } from 'react-router-dom';
import MainPage from './views/main-page/MainPage';
import MainLayout from './layouts/MainLayout';
import ShopPage from './views/shop/shop-page/ShopPage';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import Cart from './views/shop/cart-page/CartPage';

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
          <Route path="/shop/cart" element={<Cart />} />
        </Routes>
      </QueryClientProvider>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    </>
  );
}

export default App;
