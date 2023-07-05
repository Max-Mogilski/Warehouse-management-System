import type MenuButtonProps from './types';
import styles from './MenuButton.module.scss';
import { useNavigate } from 'react-router-dom';

const MenuButton = ({ path, content, disabled }: MenuButtonProps) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(path)} className={styles.btn} disabled={disabled}>
      {content}
    </button>
  );
};

export default MenuButton;
