import { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import styles from '../styles/formLogin.module.css'

export default function FormLogin(): JSX.Element {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const [isValidUser, setIsValidUser] = useState(true)

  const handleEventUser = (value: string) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}$/;
    setIsValidUser(emailPattern.test(value))

    isValidUser ? setUser(value) : setUser('')
  }

  const handleEventPassword = (value: string) => setPassword(value)
  

  return (
    <Form
      className={styles.formLogin}
      name="login"
      autoComplete=''
      layout='vertical'
    >
      <Form.Item
        className={styles.formItem}
        label="Email"
        name="user"
        rules={[{ required: true, message: 'Por favor, insira seu email!' }]}
      >
        <Input
          className={styles.inputLogin}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Insira seu email"
          onKeyUp={(e) => handleEventUser(e.currentTarget.value)}
        />
      </Form.Item>

      <Form.Item
        className={styles.formItem}
        label="Senha"
        name="password"
        rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          onKeyUp={(e) => handleEventPassword(e.currentTarget.value)}
        />
      </Form.Item>

      <Form.Item
        className={styles.formItemButton}
      >
        <Button
          type="primary"
          htmlType="submit"
          className={styles.buttonLogin}
        >
          Entrar
        </Button>
        <span className={styles.spanRegister}>Cadastre-se!</span>
      </Form.Item>
    </Form>
  )
}