import React from 'react';
import MenuLateral from '../MenuLateral/MenuLateral'; 
import styles from './Layout.module.css'; 
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode; 
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Wise Power</title>
        <meta name="description" content="Wise Power Web" />
      </Head>
      <div className={styles.container}>
        <MenuLateral />
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
