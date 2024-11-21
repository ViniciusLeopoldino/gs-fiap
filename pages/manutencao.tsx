// import React, { useState } from 'react';
// import Header from '../src/components/Header/Header';
// import Button from '../src/components/Button/Button';
// import Footer from '../src/components/Footer/Footer';
// import MenuLateral from '../src/components/MenuLateral/MenuLateral';
// import Form from '../src/components/Form/Form';
// import styles from '../src/styles/pages/SharedForm.module.css';

// const Manutencao: React.FC = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [userData, setUserData] = useState({
//     // Última Manutenção
//     itemUlt: 'Pastilha de Freio',
//     dataUlt: '10/10/2021',
//     kmUlt: '10000',
//     tipoManutUlt: 'Corretiva',
//     oficinaUlt: 'Oficina Z',
//     // Próxima Manutenção
//     itemPrc: 'Óleo do Motor',
//     dataPrc: '10/10/2022',
//     kmPrc: '20000',
//     tipoManutPrc: 'Preventiva',
//     oficinaPrc: 'Oficina A', 
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     setIsEditing(false); 
//   };

//   return (
//     <>
//       <Header title="Manutenção" />
//       <div className={styles.container}>
//         <MenuLateral />
//         <Form onSubmit={handleSubmit}>
//           <div className={styles.content}>
//             <div className={styles.dataContainer}>
//               <div className={styles.inputGroup}>
//                 <h2>Última Manutenção</h2>
//                 <p>Item:</p>
//                 <span className={styles.inputField}>
//                   {userData.itemUlt}
//                 </span>
//                 <p>Data:</p>
//                 <span className={styles.inputField}>
//                   {userData.dataUlt}
//                 </span>
//                 <p>KM:</p>
//                 <span className={styles.inputField}>
//                   {userData.kmUlt}
//                 </span>
//                 <p>Tipo:</p>
//                 <span className={styles.inputField}>
//                   {userData.tipoManutUlt}
//                 </span>
//                 <p>Oficina:</p>
//                 <span className={styles.inputField}>
//                   {userData.oficinaUlt}
//                 </span>
//               </div>

//               <div className={styles.inputGroup}>
//                 <h2>Próxima Manutenção</h2>
//                 <p>Item:</p>
//                 <span className={styles.inputField}>
//                   {isEditing ? (
//                     <select
//                       name="itemPrc"
//                       value={userData.itemPrc}
//                       onChange={handleChange}
//                     >
//                       <option value="Óleo do Motor">Óleo do Motor</option>
//                       <option value="Filtro de Ar">Filtro de Ar</option>
//                       <option value="Pastilha de Freio">Pastilha de Freio</option>
//                     </select>
//                   ) : (
//                     userData.itemPrc
//                   )}
//                 </span>
//                 <p>Data:</p>
//                 <span className={styles.inputField}>
//                   {isEditing ? (
//                     <select
//                       name="dataPrc"
//                       value={userData.dataPrc}
//                       onChange={handleChange}
//                     >
//                       <option value="10/10/2022">10/10/2022</option>
//                       <option value="15/11/2022">15/11/2022</option>
//                       <option value="20/12/2022">20/12/2022</option>
//                     </select>
//                   ) : (
//                     userData.dataPrc
//                   )}
//                 </span>
//                 <p>KM:</p>
//                 <span className={styles.inputField}>
//                   {isEditing ? (
//                     <input
//                       name="kmPrc"
//                       value={userData.kmPrc}
//                       onChange={handleChange}
//                     />
//                   ) : (
//                     userData.kmPrc
//                   )}
//                 </span>
//                 <p>Tipo:</p>
//                 <span className={styles.inputField}>
//                   {isEditing ? (
//                     <select
//                       name="tipoManutPrc"
//                       value={userData.tipoManutPrc}
//                       onChange={handleChange}
//                     >
//                       <option value="Preventiva">Preventiva</option>
//                       <option value="Corretiva">Corretiva</option>
//                     </select>
//                   ) : (
//                     userData.tipoManutPrc
//                   )}
//                 </span>
//                 <p>Oficina:</p>
//                 <span className={styles.inputField}>
//                   {isEditing ? (
//                     <select
//                       name="oficinaPrc"
//                       value={userData.oficinaPrc}
//                       onChange={handleChange}
//                     >
//                       <option value="Oficina A">Oficina A</option>
//                       <option value="Oficina B">Oficina B</option>
//                       <option value="Oficina C">Oficina C</option>
//                     </select>
//                   ) : (
//                     userData.oficinaPrc
//                   )}
//                 </span>
//               </div>
//             </div>
//             <div className={styles.buttonGroup}>
//               <Button type="button" onClick={() => setIsEditing(!isEditing)}>
//                 {isEditing ? 'Salvar' : 'Selecionar Próxima Manutenção'}
//               </Button>
//             </div>
//           </div>
//         </Form>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Manutencao;
