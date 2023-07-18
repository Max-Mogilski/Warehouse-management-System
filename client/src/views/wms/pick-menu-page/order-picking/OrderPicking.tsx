import WmsButton from '@/components/wms/wms-button/WmsButton';
import styles from './OrderPicking.module.scss';
import { useState } from 'react';
import GenerateLocation from './generate-location/GenerateLocation';
import PickItem from './pick-item/PickItem';

const options = [
  { step: 1, component: <GenerateLocation /> },
  { step: 2, component: <PickItem /> },
];

const OrderPicking = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => prev + 1);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {options.map((option) =>
          option.step === step ? option.component : null
        )}
        {step <= 1 && <WmsButton onclick={nextStep}>Start</WmsButton>}
      </div>
    </div>
  );
};

export default OrderPicking;
