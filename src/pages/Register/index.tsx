import { useState, useEffect } from 'react'
import { UserOutlined, SolutionOutlined, LockOutlined } from '@ant-design/icons'
import { Steps, Button, message, Form, Input } from "antd"

import RegisterFormTeacher from "./components/RegisterFormTeacher"

import { useLocation } from 'react-router'

import styles from './styles/register.module.css'
import stylesForm from './styles/registerForm.module.css'
import api from '../../axios'

export default function Register(): JSX.Element {
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

  function RegisterForm(): JSX.Element {

    return (
      <Form
        className={stylesForm.formRegister}
        name="login"
        autoComplete=''
        layout='vertical'
        form={form}
      >
        <Form.Item
          className={stylesForm.formItem}
          label="Nome"
          name="user"
          rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
        >
          <Input
            className={stylesForm.inputRegister}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Insira seu nome"
            onKeyUp={(e) => handleEventUser(e.currentTarget.value) }
          />
        </Form.Item>

        <Form.Item
          className={stylesForm.formItem}
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
            className={stylesForm.inputRegister}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Insira seu email"
            onKeyUp={(e) => handleEventEmail(e.currentTarget.value)}
          />
        </Form.Item>

        <Form.Item
          className={stylesForm.formItem}
          label="Senha"
          hasFeedback
          name="password"
          rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
        >
          <Input.Password
            className={stylesForm.inputRegister}
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Senha"
            onKeyUp={(e) => handleEventPassword(e.currentTarget.value)}
          />
        </Form.Item>

        <Form.Item
          className={stylesForm.formItem}
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
            className={stylesForm.inputRegister}
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirme sua senha"
            onKeyUp={(e) => handleEventPasswordConfirm(e.currentTarget.value)}
          />
        </Form.Item>
      </Form>
    )
  }

  const location = useLocation()
  const [isTeacher, setIsTeacher] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const teacher = params.get('isTeacher');
    setIsTeacher(teacher === 'true')
  }, [location.search])

  const steps = [
    {
      title: <span className={styles.stepsSpan}>Dados pessoais</span>,
      content: <RegisterForm />,
      icon: <UserOutlined className={styles.stepsIcon} />,
      disabled: false
    },
    {
      title: <span className={styles.stepsSpan}>Dados profissionais</span>,
      content: <RegisterFormTeacher />,
      icon: <SolutionOutlined className={styles.stepsIcon} />,
      disebled: isTeacher
    }
  ]

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };


  const items = steps.map((item) => ({ key: item.title, title: item.title, icon: item.icon, disabled: item.disabled }))

  return (
    <div className={styles.register}>
      <div className={styles.registerWrapper}>
        <Steps current={current} items={items} className={styles.steps} />
        <div className={styles.registerContet}>
          {steps[current].content}
        </div>

        <div className={styles.buttonsOrg} style={{ justifyContent: current > 0 ?  'space-between' : 'flex-end' }}>
          {(current < steps.length - 1 && isTeacher) && (
            <Button type="primary" onClick={() => next()}>
              Próximo
            </Button>
          )}
          {current > 0 && (
            <Button onClick={() => prev()}>
              Voltar
            </Button>
          )}
          {(current === steps.length - 1 || !isTeacher) && (
            <Button type="primary" onClick={() => {
              isTeacher ?
                api
                  .post('/professor', {
                    email: email,
                    enderecos: {
                      bairro: 'bairro',
                      cep: 'cep',
                      cidade: 'cidade',
                      complemento: 'complemento',
                      estado: 'estado',
                      logradouro: 'logradouro',
                      numero: 'numero'
                    },
                    nome: user,
                    senha: password,
                    telefone: 'telefone',
                    tipoUsuarioId: 0,
                    materiasDtoRequest: {
                      descricao: 'descricao',
                      id: 0
                    }
                  })
                  .then((response) => {
                    message.success('Cadastrado!')
                  })
                :
              api
                .post('/aluno', {
                  email: email,
                  enderecos: {
                    bairro: 'bairro',
                    cep: 'cep',
                    cidade: 'cidade',
                    complemento: 'complemento',
                    estado: 'estado',
                    logradouro: 'logradouro',
                    numero: 'numero'
                  },
                  nome: user,
                  senha: password,
                  telefone: 'telefone',
                  tipoUsuarioId: 0
                })
                .then((response) => {
                  message.success('Cadastrado!')
                })
            }}>
              Cadastrar
            </Button>
          )}
        </div>  
      </div>
    </div>
  )
}