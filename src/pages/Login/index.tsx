import { Col, Row } from "antd";
import FormLogin from "./components/FormLogin";

import styles from './styles/login.module.css'

export default function Login(): JSX.Element {
  return (
    <>
      <Row className={styles.basicUse} style={{ height: '100vh' }}>
        <Col span={11} className={`${styles.basicUse} ${styles.backgroundLogin}`}>
          <img src="/loginSvg.svg" alt="loginSvg" className={styles.loginSvg} />
          <img src="/loginUser.svg" alt="loginUser" className={styles.loginUser} />
          <h1>EasyJob</h1>
          <h2>Os melhores professores para o seu filho</h2>
        </Col>

        <Col span={13} className={`${styles.basicUse} ${styles.loginContentWrapper}`}>
          <div className={styles.loginContent}>
            <div>
              <h1>Olá</h1>
              <h2>Bem vindo de volta</h2>
            </div>

            <div>
              <FormLogin />
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}