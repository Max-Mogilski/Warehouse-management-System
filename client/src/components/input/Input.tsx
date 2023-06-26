import { forwardRef, useEffect, useState } from 'react';
import styles from './Input.module.scss';
import { InputProps } from './types';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, name, placeholder, onChange, required, ...inputProps }, ref) => {
    const [isFilled, setIsFilled] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
      setIsFilled(event.target.value !== '');
    };

    return (
      <>
        <div className={styles[`input-field`]}>
          <input
            type="text"
            id={id}
            name={name}
            ref={ref}
            spellCheck="false"
            onChange={handleInputChange}
            {...inputProps}
          />
          <label className={isFilled ? styles.filled : ''}>
            {placeholder}{' '}
            <span
              className={`${styles.required} ${required ? styles.display : ''}`}
            >
              *
            </span>
          </label>
        </div>
      </>
    );
  }
);

export default Input;
