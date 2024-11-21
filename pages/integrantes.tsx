import React from 'react';
import Header from '../src/components/Header/Header';
import Footer from '../src/components/Footer/Footer';
import Integrantes from '../src/components/Integrantes/Integrantes';
import styles from '../src/styles/pages/Integrantes.module.css';
import image from '../src/assets/Diego.jpeg';
import image2 from '../src/assets/Pablo.jpeg';
import image3 from '../src/assets/Vinicius.jpg';
import MenuLateral from '../src/components/MenuLateral/MenuLateral';

const integrantesData = [
  {
    name: 'Diego Santos',
    rm: '558711',
    image: image.src,
    github: 'https://github.com/sashabiceps',
    linkedin: 'https://www.linkedin.com/in/diego-santos-cardoso-51329430b/',
  },
  {
    name: 'Pablo Lopes',
    rm: '556834',
    image: image2.src,
    github: 'https://github.com/Pablo0703',
    linkedin: 'https://www.linkedin.com/in/pablo-lopes-09a66a275/',
  },
  {
    name: 'Vinicius Leopoldino',
    rm: '557047',
    image: image3.src,
    github: 'https://github.com/ViniciusLeopoldino',
    linkedin: 'https://www.linkedin.com/in/vinicius-leopoldino-de-oliveira-9a2194120/',
  },
];

const IntegrantesPage: React.FC = () => {
  return (
    <>
      <Header title='Integrantes' />
      <main className={styles.main}>
        <MenuLateral />
        <Integrantes integrantes={integrantesData} />
      </main>
      <Footer />
    </>
  );
};

export default IntegrantesPage;

