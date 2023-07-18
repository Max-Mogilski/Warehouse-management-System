import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from './views/main-page/MainPage';
import MainLayout from './layouts/wms/MainLayout';
import ShopPage from './views/shop/shop-page/ShopPage';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import Cart from './views/shop/cart-page/CartPage';
import OrderDetailsPage from './views/shop/order-details-page/OrderDetailsPage';
import AuthPage from './views/wms/auth-page/AuthPage';
import TransactionPage from './views/shop/transcation-page/TransactionPage';
import MenuPage from './views/wms/menu-page/MenuPage';
import Protected from './components/shared/protected/Protected';
import { useEffect, useState } from 'react';
import axios from '@/config/axios';
import API from './config/api';
import { useUserInfo } from './stores/user';
import OnlyGuest from './components/shared/protected/OnlyGuest';
import Loading from './views/loading/Loading';
import InspectionMenuPage from './views/wms/inspection-menu-page/InespectionMenuPage';
import MenagmentMenuPage from './views/wms/menagment-menu-page/MenagmentMenuPage';
import PickMenuPage from './views/wms/pick-menu-page/PickMenuPage';
import OrderList from './views/wms/inspection-menu-page/order-list/OrderList';
import OrderDetails from './views/wms/inspection-menu-page/order-list/order-details/OrderDetails';
import CreateMenu from './views/wms/menagment-menu-page/create-menu/CreateMenu';
import LocationDetails from './views/wms/inspection-menu-page/locations-list/location-details/LocationDetails';
import LocationsList from './views/wms/inspection-menu-page/locations-list/LocationsList';
import CmsUpperLayout from './layouts/wms/CmsUpperLayout';
import Pallet from './views/wms/menagment-menu-page/create-menu/pallet/Pallet';
import Product from './views/wms/menagment-menu-page/create-menu/product/Product';
import ProductDetails from './views/wms/inspection-menu-page/products-list/product-details/ProductDetails';
import ProductsInspectionList from './views/wms/inspection-menu-page/products-list/ProductsList';
import Refill from './views/wms/menagment-menu-page/refill/Refill';
import RelocateMenu from './views/wms/menagment-menu-page/relocate-menu/RelocateMenu';
import RelocateProduct from './views/wms/menagment-menu-page/relocate-menu/product/RelocateProduct';
import InspectMenu from './views/wms/menagment-menu-page/inspect-menu/InspectMenu';
import InspectProduct from './views/wms/menagment-menu-page/inspect-menu/product/InspectProduct';
import InspectLocation from './views/wms/menagment-menu-page/inspect-menu/location/InspectLocation';
import InspectPallet from './views/wms/menagment-menu-page/inspect-menu/pallet/InspectPallet';
import PalletDetails from './views/wms/inspection-menu-page/pallets-list/pallet-details/PalletDetails';
import OrderPicking from './views/wms/pick-menu-page/order-picking/OrderPicking';

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
    return <Loading />;
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MainLayout />
        <CmsUpperLayout />
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
          <Route
            path="/cms/inspection"
            element={
              <Protected>
                <InspectionMenuPage />
              </Protected>
            }
          />
          <Route
            path="/cms/inspection/orders"
            element={
              <Protected>
                <OrderList />
              </Protected>
            }
          />
          <Route
            path="/cms/inspection/orders/:id"
            element={
              <Protected>
                <OrderDetails />
              </Protected>
            }
          />
          <Route
            path="/cms/inspection/locations"
            element={
              <Protected>
                <LocationsList />
              </Protected>
            }
          />
          <Route
            path="/cms/inspection/locations/:id"
            element={
              <Protected>
                <LocationDetails />
              </Protected>
            }
          />
          <Route
            path="/cms/inspection/products"
            element={
              <Protected>
                <ProductsInspectionList />
              </Protected>
            }
          />
          <Route
            path="/cms/inspection/products/:id"
            element={
              <Protected>
                <ProductDetails />
              </Protected>
            }
          />
          <Route
            path="/cms/inspection/pallets/:id"
            element={
              <Protected>
                <PalletDetails />
              </Protected>
            }
          />
          <Route
            path="/cms/menagment"
            element={
              <Protected>
                <MenagmentMenuPage />
              </Protected>
            }
          />
          <Route
            path="/cms/menagment/create"
            element={
              <Protected>
                <CreateMenu />
              </Protected>
            }
          />
          <Route
            path="/cms/menagment/create/pallet"
            element={
              <Protected>
                <Pallet />
              </Protected>
            }
          />
          <Route
            path="/cms/menagment/create/product"
            element={
              <Protected>
                <Product />
              </Protected>
            }
          />
          <Route
            path="/cms/menagment/refill"
            element={
              <Protected>
                <Refill />
              </Protected>
            }
          />
          <Route
            path="/cms/menagment/relocate"
            element={
              <Protected>
                <RelocateMenu />
              </Protected>
            }
          />
          <Route
            path="/cms/menagment/relocate/product"
            element={
              <Protected>
                <RelocateProduct />
              </Protected>
            }
          />
          <Route
            path="/cms/menagment/inspect"
            element={
              <Protected>
                <InspectMenu />
              </Protected>
            }
          />
          <Route
            path="/cms/menagment/inspect/product"
            element={
              <Protected>
                <InspectProduct />
              </Protected>
            }
          />
          <Route
            path="/cms/menagment/inspect/location"
            element={
              <Protected>
                <InspectLocation />
              </Protected>
            }
          />
          <Route
            path="/cms/menagment/inspect/pallet"
            element={
              <Protected>
                <InspectPallet />
              </Protected>
            }
          />
          <Route
            path="/cms/pick"
            element={
              <Protected>
                <PickMenuPage />
              </Protected>
            }
          />
          <Route
            path="/cms/pick/order-picking"
            element={
              <Protected>
                <OrderPicking />
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
