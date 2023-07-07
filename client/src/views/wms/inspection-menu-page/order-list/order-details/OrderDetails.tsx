import { useParams } from 'react-router-dom';
import styles from './OrderDetails.module.scss';
import DetailsList from '@/components/wms/details-list/DetailsList';
import { useOrderQuery } from './query';
import { useEffect, useState } from 'react';
import { Detail } from '@/components/wms/details-list/types';
import ButtonBack from '@/components/shop/button/ButtonBack';
import ShowItemsButton from '@/components/wms/ShowItemsButton/ShowItemsButton';
import ProductsList from './products-list/ProductsList';

const OrderDetails = () => {
  const { id } = useParams();
  const { data } = useOrderQuery(id!);
  const [items, setItems] = useState<Detail[] | null>(null);

  useEffect(() => {
    if (data) {
      setItems([
        { key: 'Order ID', value: id! },
        { key: 'Customer', value: data.customer },
        { key: 'Email', value: data.customerEmail },
        { key: 'Address', value: data.address },
        { key: 'Total Price', value: data.totalPrice },
        { key: 'Paid', value: data.paid ? 'Yes' : 'No' },
        { key: 'Status', value: data.status },
      ]);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <DetailsList details={items} />
        <ShowItemsButton listNode={<ProductsList />}>Products</ShowItemsButton>
      </div>
    </div>
  );
};

export default OrderDetails;
