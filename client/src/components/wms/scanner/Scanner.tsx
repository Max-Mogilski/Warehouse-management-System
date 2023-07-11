import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import styles from './Scanner.module.scss';
import { useScanner } from '@/stores/scannerStore';

const QRscanner = () => {
  const [camera, setCamera] = useState<any>(null);
  let scanner: null | Html5Qrcode = null;
  const scannerState = useScanner();

  const configureCamera = () => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length > 0) {
          setCamera(devices[0].id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const startScanning = () => {
    scanner
      ?.start(
        camera,
        {
          fps: 10,
          qrbox: { width: 200, height: 200 },
        },
        (decodedText) => {
          scannerState.onScanned(decodedText);
        },
        (errorMessage) => {}
      )
      .catch((err) => {});
  };

  useEffect(() => {
    if (!camera) {
      configureCamera();
    } else {
      scanner = new Html5Qrcode('reader');
      startScanning();
    }
    return () => {
      scanner?.stop();
    };
  }, [camera]);

  return <div id="reader" className={styles.reader}></div>;
};

export default QRscanner;
