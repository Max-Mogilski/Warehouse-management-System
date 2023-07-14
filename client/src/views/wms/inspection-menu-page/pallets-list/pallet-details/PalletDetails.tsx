import { useParams } from 'react-router-dom';
import styles from './PalletDetails.module.scss';
import DetailsList from '@/components/wms/details-list/DetailsList';
import { useEffect, useState } from 'react';
import { Detail } from '@/components/wms/details-list/types';
import ShowItemsButton from '@/components/wms/show-item-button/ShowItemsButton';
import PalletProductsList from '@/components/wms/pallet-products-list/PalletProductsList';
import QRcodeCard from '@/components/wms/qr-code/QRCode';

const PalletDetails = () => {
  const { id } = useParams();
  const [items, setItems] = useState<Detail[] | null>(null);

  useEffect(() => {
    setItems([{ key: 'Pallet ID', value: id! }]);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <DetailsList details={items} />
        <div className={styles.buttons}>
          <QRcodeCard value={id!} title="Pallet QR" />
          <ShowItemsButton listNode={<PalletProductsList palletId={id!} />}>
            Products
          </ShowItemsButton>
        </div>
      </div>
    </div>
  );
};

export default PalletDetails;
