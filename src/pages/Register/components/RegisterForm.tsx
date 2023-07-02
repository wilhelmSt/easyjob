import { useState } from 'react'
import { Form, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import styles from '../styles/registerForm.module.css'

export default function RegisterForm(): JSX.Element {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  
  const [hasLength, setHasLength] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(false)

  const [form] = Form.useForm()

  const handleEventEmail = (value: string) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}$/;
    setIsValidEmail(emailPattern.test(value))

    value.length > 0 ? setHasLength(true) : setHasLength(false)
    isValidEmail ? setEmail(value) : setEmail('')
  }

  const handleEventPassword = (value: string) => setPassword(value)
  const handleEventPasswordConfirm = (value: string) => setPasswordConfirm(value)
  const handleEventUser = (value: string) => setUser(value)

  return (
    <Form
      className={styles.formRegister}
      name="login"
      autoComplete=''
      layout='vertical'
      form={form}
    >
      <Form.Item
        className={styles.formItem}
        label="Nome"
        name="user"
        rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
      >
        <Input
          className={styles.inputRegister}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Insira seu nome"
          onKeyUp={(e) => handleEventUser(e.currentTarget.value)}
        />
      </Form.Item>

      <Form.Item
        className={styles.formItem}
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Por favor, insira seu email!' }]}
        hasFeedback
        validateStatus={
          !hasLength
            ? undefined
            : isValidEmail ? 'success' : 'error'
        }
      >
        <Input
          className={styles.inputRegister}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Insira seu email"
          onKeyUp={(e) => handleEventEmail(e.currentTarget.value)}
        />
      </Form.Item>

      <Form.Item
        className={styles.formItem}
        label="Senha"
        hasFeedback
        name="password"
        rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
      >
        <Input.Password
          className={styles.inputRegister}
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Senha"
          onKeyUp={(e) => handleEventPassword(e.currentTarget.value)}
        />
      </Form.Item>

      <Form.Item
        className={styles.formItem}
        label="Confirmar Senha"
        name="passwordConfirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Por favor, insira sua senha!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('As senhas não coincidem!'));
            },
          })
        ]}
      >
        <Input.Password
          className={styles.inputRegister}
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Confirme sua senha"
          onKeyUp={(e) => handleEventPasswordConfirm(e.currentTarget.value)}
        />
      </Form.Item>
    </Form>
  )
}