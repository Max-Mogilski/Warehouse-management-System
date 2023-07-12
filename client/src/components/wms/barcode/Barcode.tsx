import React, { useRef } from 'react';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import styles from './Barcode.module.scss';
import ShowItemsButton from '../show-item-button/ShowItemsButton';

const BarcodeComponent = ({
  value,
  title,
}: {
  value: string;
  title: string;
}) => {
  const barcodeRef = useRef<HTMLDivElement>(null);

  const downloadBarcode = () => {
    html2canvas(barcodeRef.current!).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'barcode.png';
      link.click();
    });
  };

  const barcode = (
    <div className={styles.container}>
      <div ref={barcodeRef}>
        <Barcode value={value} />
      </div>
      <button onClick={downloadBarcode}>Download</button>
    </div>
  );

  return <ShowItemsButton listNode={barcode}>{title}</ShowItemsButton>;
};

export default BarcodeComponent;
