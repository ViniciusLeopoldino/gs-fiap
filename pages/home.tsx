import React from 'react';
import Button from '../src/components/Button/Button';
import styles from '../src/styles/pages/Home.module.css';
import loginImage from '../src/assets/LOGO-50X50.svg';
import Image from 'next/image';

const Home: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <video autoPlay loop muted className={styles.videoBackground}>
          <source src="/assets/energia.mp4" type="video/mp4" />
          Seu navegador não suporta o formato de vídeo.
        </video>

        <div className={styles.overlay}></div>

        <section className={styles.introSection}>
          <Image src={loginImage} alt="Login" className={styles.loginImage} width={50} height={50} />
          <h2>Bem-vindo ao Wise Power!</h2>
          <p>
            Nosso sistema visa otimizar o consumo de energia em hospitais e clínicas, oferecendo 
            uma gestão eficiente e monitoramento de todos os dispositivos e sistemas elétricos.
            Ao usar nosso software, você terá acesso a relatórios detalhados, alertas em tempo real 
            e muito mais para melhorar a eficiência energética da sua instituição.
          </p>
          <Button 
            type="button" 
            onClick={() => window.location.href = '/login'}
          >
            Acessar o Sistema
          </Button>
        </section>
      </div>
    </>
  );
};

export default Home;
