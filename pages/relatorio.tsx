import React, { useState } from 'react';
import { utils, writeFile } from 'xlsx';
import Header from '../src/components/Header/Header';
import Footer from '../src/components/Footer/Footer';
import Button from '../src/components/Button/Button';
import MenuLateral from '../src/components/MenuLateral/MenuLateral';
import styles from '../src/styles/pages/Relatorio.module.css';

const Relatorio: React.FC = () => {
  const [dadosRelatorio] = useState([
    { setor: "Administração", consumo: "4,2 MWh", economia: "R$ 1.200,00" },
    { setor: "Enfermaria", consumo: "3,1 MWh", economia: "R$ 900,00" },
    { setor: "UTI", consumo: "5,2 MWh", economia: "R$ 1.500,00" },
  ]);

  const baixarExcel = () => {
    const ws = utils.json_to_sheet(dadosRelatorio);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Relatório");
    writeFile(wb, "relatorio.xlsx");
  };

  return (
    <>
      <Header title="Relatórios" />
      <div className={styles.container}>
        <MenuLateral />
        <main className={styles.content}>
          <p>Visualize o relatório abaixo ou baixe em formato Excel.</p>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Setor</th>
                  <th>Consumo de Energia</th>
                  <th>Economia Mensal</th>
                </tr>
              </thead>
              <tbody>
                {dadosRelatorio.map((dado, index) => (
                  <tr key={index}>
                    <td>{dado.setor}</td>
                    <td>{dado.consumo}</td>
                    <td>{dado.economia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.actions}>
            <Button onClick={baixarExcel}>Baixar Excel</Button>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Relatorio;
