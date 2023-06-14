import { Route, Routes } from 'react-router-dom';
import MainPage from './views/main-page/MainPage';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <>
      <MainLayout />
      <Routes location={location}>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
