import { useState } from "react";
import Header, { HeaderProps } from "../../components/Header"

import TeacherTable from "../../components/TeacherTable";

import styles from './styles/home.module.css'

export default function Home(): JSX.Element {
  const [isTeacher, setIsTeacher] = useState(false)

  const headerProps: HeaderProps = {
    isTeacher,
    setIsTeacher
  }

  return (
    <>
      <Header {...headerProps} />
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