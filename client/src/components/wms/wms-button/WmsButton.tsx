import styles from './WmsButton.module.scss';
import { WmsButtonProps } from './types';

const WmsButton = ({ children, type, onclick, disabled }: WmsButtonProps) => (
  <button className={styles.btn} disabled={disabled} type={type} onClick={onclick}>
    {children}
  </button>
);

export default WmsButton;
