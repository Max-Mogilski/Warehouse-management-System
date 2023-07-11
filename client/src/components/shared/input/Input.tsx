import { forwardRef, useEffect, useState } from 'react';
import styles from './Input.module.scss';
import { InputProps } from './types';
import { motion } from 'framer-motion';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      placeholder,
      onChange,
      required,
      color,
      error,
      animationDelay,
      ...inputProps
    },
    ref
  ) => {
    const [isFilled, setIsFilled] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
      setIsFilled(event.target.value !== '');
    };

    return (
      <>
        <motion.div
          animate={{
            x: 0,
            y: -20,
            opacity: 1,
          }}
          transition={{ duration: 0.5, delay: animationDelay }}
          className={styles[`input-field`]}
        >
          <input
            type="text"
            id={id}
            name={name}
            ref={ref}
            step={0.01}
            spellCheck="false"
            onChange={handleInputChange}
            {...inputProps}
          />
          <label
            style={{ background: color || 'white' }}
            className={isFilled ? styles.filled : ''}
          >
            {placeholder}{' '}
            <span
              className={`${styles.required} ${required ? styles.display : ''}`}
            >
              *
            </span>
          </label>
        </motion.div>
        {error && <p className={styles.error}>{error.message}</p>}
      </>
    );
  }
);

export default Input;
