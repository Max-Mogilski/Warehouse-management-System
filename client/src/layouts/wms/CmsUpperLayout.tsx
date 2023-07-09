import ButtonBack from '@/components/shared/button/ButtonBack';
import Navigation from '@/components/wms/navigation/Navigation';
import styles from './CmsUpperLayout.module.scss';
import { useUserInfo } from '@/stores/user';
import { useLocation } from 'react-router-dom';

const CmsUpperLayout = () => {
  const location = useLocation();

  if (!location.pathname.startsWith('/cms') || !useUserInfo.getState().user) {
    return <></>;
  }
  return (
    <div className={styles.container}>
      <ButtonBack big={true} />
      <Navigation />
    </div>
  );
};

export default CmsUpperLayout;
