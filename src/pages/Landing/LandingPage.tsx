import Header, { HeaderProps } from "./components/Header"
import { useState } from 'react'

import styles from './styles/landingPage.module.css'

export default function LandingPage(): JSX.Element {  

  const [isTeacher, setIsTeacher] = useState(false)

  const headerProps: HeaderProps = {
    isTeacher,
    setIsTeacher
  }

  return (
    <>
      <Header {...headerProps} />
      <main>
        <section className={styles.section1}>
          h1
        </section>

        <section className={styles.section2}>
          h2
        </section>
      </main>
    </>
  )
}