import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Form from '../src/components/Form/Form';
import Input from '../src/components/Input/Input';
import Button from '../src/components/Button/Button';
import styles from '../src/styles/pages/InitialStyles.module.css'; 
import resetImage from '../src/assets/LOGO-50X50.svg';
import Image from 'next/image';

const ResetSenha: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !newPassword || !confirmNewPassword) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage('A nova senha e a confirmação não coincidem.');
      return;
    }

    try {
      const response = await fetch('/api/reset-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      } else {
        setSuccessMessage('Senha atualizada com sucesso!');
        setTimeout(() => router.push('/'), 2000);
      }
    } catch (error) {
      setErrorMessage('Erro ao tentar redefinir a senha. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
      <Image src={resetImage} alt="Cadastro" className={styles.resetImage} width={50} height={50} />
        <h1>Recuperar Senha</h1>
      </header>
      <main className={styles.main}>
        <Form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail:</label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="E-mail" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="new-password">Nova Senha:</label>
            <Input 
              type="password" 
              id="new-password" 
              name="new-password" 
              placeholder="Nova Senha" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirm-new-password">Confirme a Nova Senha:</label>
            <Input 
              type="password" 
              id="confirm-new-password" 
              name="confirm-new-password" 
              placeholder="Confirme a Nova Senha" 
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          {successMessage && <p className={styles.success}>{successMessage}</p>}
          <div className={styles.buttonGroup}>
            <Button type="submit">Recuperar</Button>
            <Button type="button" onClick={() => router.push('/')}>Voltar</Button>
          </div>
        </Form>
      </main>
    </div>
  );
};

export default ResetSenha;
