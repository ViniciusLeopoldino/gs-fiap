import React, { useEffect, useState } from 'react';
import Header from '../src/components/Header/Header';
import Button from '../src/components/Button/Button';
import Footer from '../src/components/Footer/Footer';
import MenuLateral from '../src/components/MenuLateral/MenuLateral';
import Form from '../src/components/Form/Form';
import styles from '../src/styles/pages/SharedForm.module.css';

const Perfil: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem('userEmail');

      if (email) {
        try {
          const response = await fetch(`/api/perfil?email=${encodeURIComponent(email)}`);
          if (!response.ok) {
            throw new Error('Usuário não encontrado');
          }
          const data = await response.json();

          const userObject = {
            id: data[0], // ID_CADASTRO
            email: data[1],
            dataCadastro: data[2],
            senha: data[3],
            confSenha: data[4],
            nome: data[5],
            cpf: data[6],
            // telefone: data[7],
            // cep: data[8],
            cargo: data[7],
            // ano: data[10],
            departamento: data[8],
            // cor: data[12],
          };

          setUserData(userObject);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        }
      } else {
        setError('Usuário não logado');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/attperfil', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar dados');
      }

      const result = await response.json();
      alert(result.message);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert('Erro ao atualizar dados: ' + error.message);
      } else {
        alert('Erro ao atualizar dados');
      }
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData || Object.keys(userData).length === 0) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Header title="Perfil" />
      <div className={styles.container}>
        <MenuLateral />
        <Form onSubmit={handleSubmit}>
          <div className={styles.content}>
          <h2>Dados Cadastrais</h2>
            <div className={styles.dataContainer}>
            
              <div className={styles.inputGroup}>
                {/* <h2>Dados Pessoais</h2> */}
                <p>Nome:</p>
                <span className={styles.inputField}>
                  {isEditing ? (
                    <input name="nome" value={userData.nome} onChange={handleChange} />
                  ) : (
                    userData.nome
                  )}
                </span>
                <p>CPF:</p>
                <span className={styles.inputField}>
                  {isEditing ? (
                    <input name="cpf" value={userData.cpf} onChange={handleChange} />
                  ) : (
                    userData.cpf
                  )}
                </span>
                {/* <p>Telefone:</p>
                <span className={styles.inputField}>
                  {isEditing ? (
                    <input name="telefone" value={userData.telefone} onChange={handleChange} />
                  ) : (
                    userData.telefone
                  )} */}
                {/* </span> */}
                {/* <p>CEP:</p>
                <span className={styles.inputField}>
                  {isEditing ? (
                    <input name="cep" value={userData.cep} onChange={handleChange} />
                  ) : (
                    userData.cep
                  )}
                </span> */}
              </div>
              <div className={styles.inputGroup}>
                {/* <h2>Dados do Veículo</h2> */}
                <p>Cargo:</p>
                <span className={styles.inputField}>
                  {isEditing ? (
                    <input name="cargo" value={userData.cargo} onChange={handleChange} />
                  ) : (
                    userData.cargo
                  )}
                </span>
                {/* <p>Ano:</p>
                <span className={styles.inputField}>
                  {isEditing ? (
                    <input name="ano" value={userData.ano} onChange={handleChange} />
                  ) : (
                    userData.ano
                  )}
                </span> */}
                <p>Departamento:</p>
                <span className={styles.inputField}>
                  {isEditing ? (
                    <input name="departamento" value={userData.departamento} onChange={handleChange} />
                  ) : (
                    userData.departamento
                  )}
                </span> 
                {/* <p>Cor:</p>
                <span className={styles.inputField}>
                  {isEditing ? (
                    <input name="cor" value={userData.cor} onChange={handleChange} />
                  ) : (
                    userData.cor
                  )}
                </span>  */}
              </div>
            </div>
            <div className={styles.buttonGroup}>
              <Button type="button" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancelar' : 'Editar'}
              </Button>
              {isEditing && (
                <Button type="submit">
                  Salvar
                </Button>
              )}
            </div>

          </div>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default Perfil;
