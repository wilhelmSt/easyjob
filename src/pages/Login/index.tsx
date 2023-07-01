import { Col, Row } from "antd";
import styles from './styles/login.module.css'

export default function Login(): JSX.Element {
  return (
    <>
      <Row className={styles.basicUse}>
        <Col span={10} className={styles.basicUse}>
          <h1>Login</h1>
        </Col>

        <Col span={14} className={styles.basicUse}>
          <h1>Register</h1>
        </Col>
      </Row>
    </>
  )
}