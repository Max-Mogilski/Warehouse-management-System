import { useEffect, useState } from 'react';
import { Variants, motion } from 'framer-motion';
import styles from './Navigation.module.scss';
import Bar from '@/components/shop/bar/Bar';
import { useLogoutUser } from './query';
import { useUserInfo } from '@/stores/user';
import { toast } from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';

const variants: Variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '100%' },
};

const Navigation = () => {
  const location = useLocation();
  const useLogout = useLogoutUser();
  const [show, setShow] = useState(false);

  if (!location.pathname.startsWith('/cms') || !useUserInfo.getState().user) {
    return <></>;
  }

  const handleLogout = () => {
    useLogout.mutate(undefined, {
      onSuccess: () => {
        useUserInfo.setState({ user: null });
        setShow(false);
        toast.success('Logged out!');
      },
    });
  };

  return (
    <>
      <motion.nav
        className={styles.nav}
        animate={show ? 'open' : 'closed'}
        variants={variants}
        transition={{ duration: 0.5 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div className={styles['inner-nav']}>
          <h2>WMS</h2>
          <Bar />
          <motion.ul>
            <motion.li whileTap={{ scale: 0.9 }}>
              <Link onClick={() => setShow(false)} to="/cms">
                Menu
              </Link>
            </motion.li>
            <motion.li whileTap={{ scale: 0.9 }}>
              <Link onClick={() => setShow(false)} to="/cms/pick/start">
                Order Pick
              </Link>
            </motion.li>
          </motion.ul>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLogout}
            className={styles.logout}
            disabled={useLogout.isLoading}
          >
            {useLogout.isLoading ? 'Loading' : 'Logout'}
          </motion.button>
        </motion.div>
      </motion.nav>
      {show && (
        <motion.div className={styles.blur} onClick={() => setShow(false)} />
      )}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        className={`${styles.toggle} ${show ? ' ' + styles.iconOpen : ''}`}
        onClick={() => setShow((prev) => !prev)}
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </motion.button>
    </>
  );
};

export default Navigation;
