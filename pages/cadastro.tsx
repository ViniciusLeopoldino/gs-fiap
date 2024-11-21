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
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [placa, setPlaca] = useState('');
  const [cor, setCor] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !senha || !confsenha || !nome || !cpf || !telefone || !cep || !modelo || !ano || !placa || !cor) {
      setErrorMessage('Todos os campos são obrigatórios.');
      return;
    }

    if (senha !== confsenha) {
      setErrorMessage('A senha e a confirmação da senha não coincidem.');
      return;
    }

    const anoNumber = Number(ano);
    if (isNaN(anoNumber) || anoNumber <= 0) {
      setErrorMessage('Ano inválido.');
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
        telefone,
        cep,
        modelo,
        ano: anoNumber,
        placa,
        cor,
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
            <label htmlFor="telefone">Telefone:</label>
            <Input
              type="text"
              id="telefone"
              name="telefone"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="cep">CEP:</label>
            <Input
              type="text"
              id="cep"
              name="cep"
              placeholder="CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="modelo">Modelo:</label>
            <Input
              type="text"
              id="modelo"
              name="modelo"
              placeholder="Modelo do veículo"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="ano">Ano:</label>
            <Input
              type="number"
              id="ano"
              name="ano"
              placeholder="Ano do veículo"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="placa">Placa:</label>
            <Input
              type="text"
              id="placa"
              name="placa"
              placeholder="Placa do veículo"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="cor">Cor:</label>
            <Input
              type="text"
              id="cor"
              name="cor"
              placeholder="Cor do veículo"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
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

