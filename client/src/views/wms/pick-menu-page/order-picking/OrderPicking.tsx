import WmsButton from '@/components/wms/wms-button/WmsButton';
import styles from './OrderPicking.module.scss';
import { useEffect, useState } from 'react';
import PickItem from './pick-item/PickItem';
import { useAssignTaskMutation, useTaskStatusQuery } from './query';
import Loader from '@/components/shared/loader/Loader';
import { toast } from 'react-hot-toast';
import OrderPicked from './order-picked/OrderPicked';

const OrderPicking = () => {
  const { data: statusData, isLoading, refetch } = useTaskStatusQuery();
  const [step, setStep] = useState(0);
  const assignMutation = useAssignTaskMutation();
  const [currentTaskId, setCurrentTaskId] = useState('');

  const options = [
    { step: 1, component: <PickItem setStep={setStep} /> },
    {
      step: 2,
      component: <OrderPicked taskId={currentTaskId} setStep={setStep} />,
    },
  ];

  const nextStep = () => setStep((prev) => prev + 1);

  const handleTaskAction = () => {
    assignMutation.mutate(undefined, {
      onSuccess: (data) => {
        if (!data.data) {
          toast.error(data.msg);
        } else {
          setCurrentTaskId(data?.data?.id);
          nextStep();
        }
      },
    });
  };

  if (isLoading) {
    <div className={styles.loader}>
      <Loader />
    </div>;
  }

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (statusData) {
      setStep(1);
      setCurrentTaskId(statusData.id);
    }
  }, [statusData]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {options.map((option) =>
          option.step === step ? option.component : null
        )}
        {step === 0 && (
          <WmsButton
            disabled={isLoading || assignMutation.isLoading}
            onclick={handleTaskAction}
          >
            {isLoading || assignMutation.isLoading ? 'Loading' : 'Start'}
          </WmsButton>
        )}
      </div>
    </div>
  );
};

export default OrderPicking;
