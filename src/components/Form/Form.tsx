import React from 'react';
import styles from './Form.module.css';

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <div className={styles.container}> 
      <form className={styles.form} onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};

export default Form;


