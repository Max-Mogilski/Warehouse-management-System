import { useUserInfo } from '@/stores/user';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const OnlyGuest = ({ children }: { children: ReactNode }) => {
  const user = useUserInfo((state) => state.user);

  if (user) {
    return <Navigate to="/cms" replace />;
  }
  return children;
};

export default OnlyGuest;
