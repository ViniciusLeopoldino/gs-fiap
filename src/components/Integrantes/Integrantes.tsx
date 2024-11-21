import React from 'react';
import styles from './Integrantes.module.css';

interface Integrante {
  name: string;
  rm: string;
  image: string;
  github: string;
  linkedin: string;
}

interface IntegrantesProps {
  integrantes: Integrante[];
}

const Integrantes: React.FC<IntegrantesProps> = ({ integrantes }) => {
  return (
    <div className={styles.integrantesContainer}>
      {integrantes.map((integrante) => (
        <div key={integrante.rm} className={styles.integranteCard}>
          <img
            src={integrante.image}
            alt={integrante.name}
            className={styles.integranteImage}
          />
          <h3>{integrante.name}</h3>
          <p>RM: {integrante.rm}</p>
          <div>
            <a href={integrante.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={integrante.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Integrantes;
