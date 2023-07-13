import MenuButton from '../menu-button/MenuButton';
import MenuButtonProps from '../menu-button/types';
import styles from './MenuList.module.scss';
import Loader from '../loader/Loader';

const MenuList = ({
  options,
  isLoading,
}: {
  options: MenuButtonProps[] | null;
  isLoading?: boolean;
}) => {
  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  return (
    <nav className={styles.container}>
      {options?.length === 0 && <p>Nothing found</p>}
      {options ? (
        options?.map((button) => (
          <MenuButton
            onClick={button.onClick}
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
