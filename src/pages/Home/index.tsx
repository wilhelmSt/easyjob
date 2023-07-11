import Header from "../../components/Header"

import TeacherTable from "../../components/TeacherTable";

import styles from './styles/home.module.css'

export default function Home(): JSX.Element {

  return (
    <>
      <Header />
      <div className={styles.home}>
        <div className={styles.homeTitle}>
          <h1>Encontre aqui seu professor</h1>
          <h4>Filtre da forma que lhe ajude</h4>
        </div>

        <div className={styles.teacherTable}>
          <TeacherTable />
        </div>
      </div>
    </>
  );
}