import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import styles from './QRcode.module.scss';
import { Link } from 'react-router-dom';
import ShowItemsButton from '../show-item-button/ShowItemsButton';

const QRcodeCard = ({ value, title }: { value: string; title: string }) => {
  const [qrcode, setQrcode] = useState('');

  useEffect(() => {
    QRCode.toDataURL(value, (error, value) => {
      if (error) return console.log(error);
      setQrcode(value);
    });
  }, []);

  const qrCodeContainer = (
    <div className={styles.container}>
      <img src={qrcode} />

      <button>
        <Link to={qrcode} download={`qrcode-${value}.png`}>
          Download
        </Link>
      </button>
    </div>
  );

  return <ShowItemsButton listNode={qrCodeContainer}>{title}</ShowItemsButton>;
};

export default QRcodeCard;
