import React, { useState } from 'react';
import Header from '../src/components/Header/Header';
import Footer from '../src/components/Footer/Footer';
import Button from '../src/components/Button/Button';
import Chatbot from '../src/components/Chatbot/Chatbot'; // Importa o componente chatbot
import styles from '../src/styles/pages/PortoAutoCheck.module.css';
import MenuLateral from '../src/components/MenuLateral/MenuLateral';
import Form from '../src/components/Form/Form';

const PortoAutoCheck: React.FC = () => {
  const [showDiagnosticChat, setShowDiagnosticChat] = useState(false);
  const [showEstimateChat, setShowEstimateChat] = useState(false);

  const diagnosticQuestions = [
    "Qual é o problema atual do veículo?",
    "Há barulhos incomuns?",
    "Há vazamento de óleo ou outros fluidos?"
  ];

  const estimateQuestions = [
    "Qual peça você precisa substituir?",
    "Qual é a marca do seu veículo?",
    "Qual é o ano do seu veículo?"
  ];

  return (
    <>
      <Header title="Porto Auto Check" />
      <div className={styles.container}>
        <MenuLateral />
        <Form onSubmit={(event) => { event.preventDefault(); /* handle form submission */ }}>
          <main className={styles.main}>
            <section className={styles.section}>
              <h2>Autoatendimento</h2>
              <div className={styles.buttons}>
                <Button onClick={() => setShowDiagnosticChat(true)}>Iniciar Autodiagnóstico</Button>
                <br />
                <Button onClick={() => setShowEstimateChat(true)}>Iniciar Auto-Orçamento</Button>
              </div>
            </section>
          </main>
        </Form>
      </div>

      {/* Chatbot para Autodiagnóstico */}
      {showDiagnosticChat && (
        <Chatbot 
          title="Autodiagnóstico do Veículo" 
          questions={diagnosticQuestions} 
          onClose={() => setShowDiagnosticChat(false)} 
        />
      )}

      {/* Chatbot para Auto-Orçamento */}
      {showEstimateChat && (
        <Chatbot 
          title="Auto-Orçamento de Peças" 
          questions={estimateQuestions} 
          onClose={() => setShowEstimateChat(false)} 
        />
      )}

      <Footer />
    </>
  );
};

export default PortoAutoCheck;
