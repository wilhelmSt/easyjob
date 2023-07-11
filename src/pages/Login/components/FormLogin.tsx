import { useState } from 'react'
import { Form, Input, Button, Switch } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import api from '../../../axios'

import styles from '../styles/formLogin.module.css'
import { Link, useNavigate } from 'react-router-dom'

export default function FormLogin(): JSX.Element {
  const navegate = useNavigate()

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [isProf, setIsProf] = useState(false)

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
      onFinish={() => {
        isProf
          ? api.post('/professores/loginProfessores', {
            email: user,
            senha: password
          }).then((res) => {
            console.log(res)
            navegate('/home')
          })
          : api.post('/aluno/loginAluno', {
            email: user,
            senha: password
          }).then((res) => {
            console.log(res)
            navegate('/home')
          })
      }}
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
        className={styles.formItem}
      >
        <span className={styles.spanSwitch}>Pai/Aluno</span>
        <Switch onChange={(e) => setIsProf(e)}/>
        <span className={styles.spanSwitch}>Professor</span>
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

        <Link to='/register?isTeacher=false' className={styles.linkRegister}>
          <span className={styles.spanRegister}>Cadastre-se como Pai/Aluno!</span>
        </Link>

        <Link to='/register?isTeacher=true' className={styles.linkRegister}>
          <span className={styles.spanRegister}>Cadastre-se como Professor!</span>
        </Link>
      </Form.Item>
    </Form>
  )
}