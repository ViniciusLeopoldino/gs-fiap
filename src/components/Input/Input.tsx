import React from 'react';
import styles from './Input.module.css';

interface InputProps {
  id: string;
  name: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  type = 'text',
  value,
  placeholder,
  onChange,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={styles.input}
    />
  );
};

export default Input;

