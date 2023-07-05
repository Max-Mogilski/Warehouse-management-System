import backArrow from '@/assets/icons/back-arrow.svg';
import styles from './ButtonBack.module.scss';
import { useNavigate } from 'react-router-dom';

const ButtonBack = ({
  navigateTo,
  big,
}: {
  navigateTo: string;
  big?: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <button
      className={`${styles.btn} ${big ? styles.big : ''}`}
      onClick={() => navigate(navigateTo)}
    >
      <img src={backArrow} />
    </button>
  );
};

export default ButtonBack;
