import Loader from '@/components/loader/Loader';
import styles from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.container}>
      <Loader />
    </div>
  );
};

export default Loading;
