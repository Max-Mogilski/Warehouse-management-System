import WmsButton from '@/components/wms/wms-button/WmsButton';
import styles from './OrderPicked.module.scss';
import QRcodeCard from '@/components/wms/qr-code/QRCode';
import { useNavigate } from 'react-router-dom';

const OrderPicked = ({ setStep }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <QRcodeCard
          initOpen={true}
          value={'342143124542'}
          title="Shipment QR"
        />
        <WmsButton onclick={() => setStep(0)}>Confirm</WmsButton>
      </div>
    </div>
  );
};

export default OrderPicked;
