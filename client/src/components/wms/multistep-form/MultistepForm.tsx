import { MultiStepFormProps } from './types';
import styles from './MultiStepForm.module.scss';

const MultiStepForm = ({ step, pages }: MultiStepFormProps) => {
  return pages.map((page) => (
    <div
      className={styles.container}
      key={page.index}
      style={{ display: page.index - 1 === step ? 'flex' : 'none' }}
    >
      {page.component}
    </div>
  ));
};

export default MultiStepForm;
