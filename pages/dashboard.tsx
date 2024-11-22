import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import Header from '../src/components/Header/Header';
import Footer from '../src/components/Footer/Footer';
import MenuLateral from '../src/components/MenuLateral/MenuLateral';
import styles from '../src/styles/pages/Dashboard.module.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const dadosSimulados = {
    consumoEnergia: "12,5 MWh",
    economiaMensal: "R$ 8.500,00",
    consumoPorSetor: [
      { setor: "Administração", consumo: 4.2 },
      { setor: "Enfermaria", consumo: 3.1 },
      { setor: "UTI", consumo: 5.2 },
    ],
    alertas: [
      "Setor UTI com consumo acima da média",
      "Equipamento X com funcionamento irregular",
    ],
  };

  // Dados do Gráfico de Barras (Consumo por Setor)
  const barChartData = {
    labels: dadosSimulados.consumoPorSetor.map((setor) => setor.setor),
    datasets: [
      {
        label: 'Consumo de Energia (MWh)',
        data: dadosSimulados.consumoPorSetor.map((setor) => setor.consumo),
        backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
      },
    ],
  };

  // Dados do Gráfico de Rosca (Economia Mensal)
  const doughnutChartData = {
    labels: ['Economia', 'Consumo'],
    datasets: [
      {
        data: [8.5, 12.5], // Economia e Consumo (valores simulados)
        backgroundColor: ['#4caf50', '#f44336'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <Header title="Dashboard" />
      <div className={styles.container}>
        <MenuLateral />
        <main className={styles.dashboardContent}>
          <section className={styles.overview}>
            <h2>Visão Geral</h2>
            <div className={styles.cards}>
              <div className={styles.card}>
                <h3>Consumo de Energia</h3>
                <p>{dadosSimulados.consumoEnergia}</p>
              </div>
              <div className={styles.card}>
                <h3>Economia Mensal Estimada</h3>
                <p>{dadosSimulados.economiaMensal}</p>
              </div>
              <div className={styles.card}>
                <h3>Alertas</h3>
                <ul>
                  {dadosSimulados.alertas.map((alerta, index) => (
                    <li key={index}>{alerta}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className={styles.charts}>
            <h2>Gráficos</h2>
            <div className={styles.chartContainer}>
              <h3>Consumo por Setor</h3>
              <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            <div className={styles.chartContainer}>
              <h3>Economia Mensal</h3>
              <Doughnut data={doughnutChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;

