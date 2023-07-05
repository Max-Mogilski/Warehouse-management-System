import ButtonBack from '@/components/shop/button/ButtonBack';
import MenuButton from '../menu-button/MenuButton';
import MenuButtonProps from '../menu-button/types';
import styles from './MenuList.module.scss';
import Loader from '../loader/Loader';

const MenuList = ({
  options,
  previousRoute,
}: {
  options: MenuButtonProps[] | null;
  previousRoute?: string;
}) => {
  return (
    <nav className={styles.container}>
      {previousRoute && <ButtonBack big={true} navigateTo={previousRoute} />}
      {options ? (
        options?.map((button) => (
          <MenuButton
            key={button.content}
            content={button.content}
            path={button.path}
            disabled={button.disabled ? true : false}
          />
        ))
      ) : (
        <Loader />
      )}
    </nav>
  );
};

export default MenuList;
