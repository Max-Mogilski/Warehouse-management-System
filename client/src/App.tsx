import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from './views/main-page/MainPage';
import MainLayout from './layouts/MainLayout';
import ShopPage from './views/shop/shop-page/ShopPage';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import Cart from './views/shop/cart-page/CartPage';
import OrderDetailsPage from './views/shop/order-details-page/OrderDetailsPage';
import AuthPage from './views/wms/auth-page/AuthPage';
import TransactionPage from './views/shop/transcation-page/TransactionPage';
import MenuPage from './views/wms/menu-page/MenuPage';
import Protected from './components/protected/Protected';
import { useEffect, useState } from 'react';
import axios from '@/config/axios';
import API from './config/api';
import { useUserInfo } from './stores/user';
import OnlyGuest from './components/protected/OnlyGuest';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 20000 } },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(API.GET_CURRENT_USER);
        const { user } = response.data;
        useUserInfo.setState({ user });
      } catch (error) {
        useUserInfo.setState({ user: null });
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MainLayout />
        <Routes location={location}>
          <Route path="/" element={<MainPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/cart" element={<Cart />} />
          <Route path="/shop/details" element={<OrderDetailsPage />} />
          <Route path="/shop/transaction/:id" element={<TransactionPage />} />
          <Route
            path="/cms/auth"
            element={
              <OnlyGuest>
                <AuthPage />
              </OnlyGuest>
            }
          />
          <Route
            path="/cms"
            element={
              <Protected>
                <MenuPage />
              </Protected>
            }
          />
          <Route path="*" element={<Navigate to="/cms/auth" />}></Route>
        </Routes>
      </QueryClientProvider>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
