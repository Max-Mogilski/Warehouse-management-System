import WmsButton from '@/components/wms/wms-button/WmsButton';
import styles from './OrderPicked.module.scss';
import QRcodeCard from '@/components/wms/qr-code/QRCode';

const OrderPicked = ({
  setStep,
  taskId,
}: {
  setStep: (step: number) => void;
  taskId: string;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.shipment}>Shipment No: {taskId}</p>
        <QRcodeCard initOpen={true} value={taskId} title="Shipment QR" />
        <WmsButton onclick={() => setStep(0)}>Confirm</WmsButton>
      </div>
    </div>
  );
};

export default OrderPicked;
