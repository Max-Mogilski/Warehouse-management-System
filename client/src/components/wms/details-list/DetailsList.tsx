import Loader from '@/components/shared/loader/Loader';
import styles from './DetailsList.module.scss';
import { DetailsListProps } from './types';

const DetailsList = ({ details }: DetailsListProps) => {
  if (!details) {
    return <Loader />;
  }
  return (
    <ul className={styles.container}>
      {details?.map((detail) => (
        <li>
          {detail.key}: {detail.value}
        </li>
      ))}
    </ul>
  );
};

export default DetailsList;
