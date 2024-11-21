import React, { useState } from 'react';
import Link from 'next/link'; 
import styles from '../MenuLateral/MenuLateral.module.css'; 
import logo from '../../assets/LOGO-50X50.svg'; 
import Image from 'next/image';

const MenuLateral: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className={`${styles.menuLateral} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.logo}>
        <Link href="/perfil"><Image src={logo} alt="Logo" /></Link>
        </div>
        <ul className={styles.menuItems}>
          <li><Link href="/perfil">Perfil</Link></li> 
          {/* <li><Link href="/porto-auto-check">Porto Auto Check</Link></li> */}
          {/* <li><Link href="/manutencao">Manutenção</Link></li> */}
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/fale-conosco">Relatórios</Link></li>
          <li><Link href="/">Sair</Link></li>
          <br />
          <li><Link href="/integrantes">Integrantes</Link></li>
        </ul>
      </nav>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
};

export default MenuLateral;
