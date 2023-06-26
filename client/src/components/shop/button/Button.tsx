import { useNavigate } from 'react-router-dom';
import styles from './Button.module.scss';

const Button = ({ disabled, content, navigateTo, onClick }: ButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (navigateTo) navigate(navigateTo);
    if (onClick) onClick();
  };

  return (
    <button className={styles.btn} onClick={handleClick} disabled={disabled}>
      {content}
    </button>
  );
};

export default Button;
