import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; 
import Form from '../src/components/Form/Form';
import Input from '../src/components/Input/Input';
import Button from '../src/components/Button/Button';
import styles from '../src/styles/pages/InitialStyles.module.css';
import cadastroImage from '../src/assets/LOGO-50X50.svg';
import Image from 'next/image';

const Cadastro: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confsenha, setConfsenha] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [cargo, setCargo] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !senha || !confsenha || !nome || !cpf || !cargo || !departamento) {
      setErrorMessage('Todos os campos são obrigatórios.');
      return;
    }

    if (senha !== confsenha) {
      setErrorMessage('A senha e a confirmação da senha não coincidem.');
      return;
    }

    setLoading(true); 
    setErrorMessage(''); 
    setSuccessMessage(''); 

    try {
      const response = await axios.post('/api/cadastro', {
        email,
        senha,
        confsenha,
        nome,
        cpf,
        cargo,
        departamento,
      });

      if (response.status === 201) {
        setSuccessMessage('Cadastro realizado com sucesso!');
        setTimeout(() => router.push('/'), 2000);
      } else {
        setErrorMessage('Erro ao realizar o cadastro. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setErrorMessage('Falha na comunicação com o servidor. Tente novamente mais tarde.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
      <Image src={cadastroImage} alt="Cadastro" className={styles.cadastroImage} width={50} height={50} />
      </header>
      <main className={styles.main}>
        <h1>Cadastro</h1>
        <Form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail:</label>
            <Input
              type="text"
              id="email"
              name="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="senha">Senha:</label>
            <Input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="conf-senha">Confirme a senha:</label>
            <Input
              type="password"
              id="confsenha"
              name="confsenha"
              placeholder="Confirme sua senha"
              value={confsenha}
              onChange={(e) => setConfsenha(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="nome">Nome:</label>
            <Input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="cpf">CPF:</label>
            <Input
              type="text"
              id="cpf"
              name="cpf"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="cargo">Cargo:</label>
            <Input
              type="text"
              id="cargo"
              name="cargo"
              placeholder="Cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="departamento">Departamento:</label>
            <Input
              type="text"
              id="departamento"
              name="departamento"
              placeholder="Departamento"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
            />
          </div>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          {successMessage && <p className={styles.success}>{successMessage}</p>}
          <div className={styles.buttonGroup}>
            <Button type="submit" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
            <Button type="button" onClick={() => router.push('/')}>
              Voltar
            </Button>
          </div>
        </Form>
      </main>
    </div>
  );
};

export default Cadastro;

