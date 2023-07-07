import backArrow from '@/assets/icons/back-arrow.svg';
import styles from './ButtonBack.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const ButtonBack = ({
  navigateTo,
  big = true,
}: {
  navigateTo?: string;
  big?: boolean;
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const previousPathSegments = location.pathname.split('/');
  previousPathSegments.pop();
  let previousPath = previousPathSegments.join('/');
  if (!previousPath) {
    previousPath = '/';
  }

  return (
    <button
      className={`${styles.btn} ${big ? styles.big : ''}`}
      onClick={() => navigate(previousPath)}
    >
      <img src={backArrow} />
    </button>
  );
};

export default ButtonBack;
