import type MenuButtonProps from './types';
import styles from './MenuButton.module.scss';
import { useNavigate } from 'react-router-dom';

const MenuButton = ({ path, content, disabled, onClick }: MenuButtonProps) => {
  const navigate = useNavigate();

  const handlClick = () => {
    if (path) navigate(path);
    if (onClick) onClick();
  };
  return (
    <button onClick={handlClick} className={styles.btn} disabled={disabled}>
      {content}
    </button>
  );
};

export default MenuButton;
