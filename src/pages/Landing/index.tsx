import Header, { HeaderProps } from "./components/Header"
import Learn from "./components/Learn"

import { useState } from 'react'
import { Col, Row } from 'antd'

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
          <Row gutter={[5, 10]} className={styles.basicUse}>
            <Col span={12} className={`${styles.basicUse} ${styles.colContentTitle}`}>
              <div>
                <h1>Encontre o professor ideal para você</h1>
                <h4>seja online ou presencial,</h4>
                <h6>faça sua escolha entre diversos professores</h6>
              </div>
            </Col>

            <Col span={12} className={styles.basicUse}>
              <Row gutter={[5, 16]} className={`${styles.basicUse} ${styles.imgRow}`}>
                <Col span={11} className={`${styles.basicUse} ${styles.imgColUpper}`}>
                  <div className={`${styles.image} ${styles.imgUpper}`} />
                </Col>

                <Col span={11} className={`${styles.basicUse} ${styles.imgColBottom}`}>
                  <div className={`${styles.image} ${styles.imgBottom}`} />
                </Col>
              </Row>
            </Col>
          </Row>
        </section>

        <section className={styles.section2}>
          <Row className={styles.basicUse}>
            <Col span={24} className={`${styles.basicUse} ${styles.section2Content}`}>
              <Row className={`${styles.basicUse} ${styles.learnRow}`}>
                <Col span={20} className={`${styles.basicUse} ${styles.learnCol}`}>
                  <Learn />
                </Col>
              </Row>
            </Col>
          </Row>
        </section>
      </main>
    </>
  )
}