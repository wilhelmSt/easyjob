import { useState, useEffect } from 'react'
import { UserOutlined, SolutionOutlined } from '@ant-design/icons'
import { Steps, Button, message } from "antd"

import RegisterForm from "./components/RegisterForm"
import RegisterFormTeacher from "./components/RegisterFormTeacher"

import { useLocation } from 'react-router'

import styles from './styles/register.module.css'

export default function Register(): JSX.Element {
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
            <Button type="primary" onClick={() => message.success('Cadastrado!')}>
              Cadastrar
            </Button>
          )}
        </div>  
      </div>
    </div>
  )
}