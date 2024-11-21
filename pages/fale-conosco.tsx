import React from 'react';
import Input from '../src/components/Input/Input';
import Button from '../src/components/Button/Button';
import Footer from '../src/components/Footer/Footer';
import Header from '../src/components/Header/Header';
import styles from '../src/styles/pages/FaleConosco.module.css';
import MenuLateral from '../src/components/MenuLateral/MenuLateral';

const FaleConosco: React.FC = () => {
  return (
    <>
    <Header title="Fale Conosco" />
    <div className={styles.container}>
    <MenuLateral /> 
      <div>
        <Input type="text" id="nome" name="nome" placeholder="Nome" />
        <br />
        <Input type="email" id="email" name="email" placeholder="E-mail" />
        <textarea id="mensagem" name="mensagem" placeholder="Deixe sua mensagem" />
        <form onSubmit={() => alert('Mensagem enviada com sucesso!')}>
        <Button type="submit">Enviar</Button>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default FaleConosco;
