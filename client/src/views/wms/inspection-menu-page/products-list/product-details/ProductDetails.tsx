import { useParams } from 'react-router-dom';
import styles from './ProductDetails.module.scss';
import DetailsList from '@/components/wms/details-list/DetailsList';
import { useEffect, useState } from 'react';
import { Detail } from '@/components/wms/details-list/types';
import { useProductQuery } from './query';
import BarcodeComponent from '@/components/wms/barcode/Barcode';

const ProductDetails = () => {
  const { id } = useParams();
  const { data } = useProductQuery(id!);
  const [items, setItems] = useState<Detail[] | null>(null);

  useEffect(() => {
    console.log(data);
    if (data) {
      setItems([
        { key: 'Product ID', value: id! },
        { key: 'Product Name', value: data?.name },
        { key: 'Price', value: data?.price },
        { key: 'Shop quantity', value: data?.quantity },
        { key: 'Stock quantity', value: data?.quantityStock },
        { key: 'Weight', value: `${data?.weight} kg` },
      ]);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={data?.url} className={styles.img} />
        <DetailsList details={items} />
        <BarcodeComponent value={id!} title="Barcode" />
      </div>
    </div>
  );
};

export default ProductDetails;
