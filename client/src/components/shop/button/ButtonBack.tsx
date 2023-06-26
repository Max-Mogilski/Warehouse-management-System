import backArrow from '@/assets/icons/back-arrow.svg';
import styles from './ButtonBack.module.scss';
import { useNavigate } from 'react-router-dom';

const ButtonBack = ({ navigateTo }: { navigateTo: string }) => {
  const navigate = useNavigate();

  return (
    <button className={styles.btn} onClick={() => navigate(navigateTo)}>
      <img src={backArrow} />
    </button>
  );
};

export default ButtonBack
