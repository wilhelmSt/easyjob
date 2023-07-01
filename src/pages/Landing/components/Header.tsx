import { useEffect, useState } from 'react'
import { Row, Col, Button } from 'antd'
import { UserOutlined, UserAddOutlined } from '@ant-design/icons'

import styles from '../styles/header.module.css'

export interface HeaderProps {
  isTeacher: boolean,
  setIsTeacher: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({isTeacher, setIsTeacher}: HeaderProps): JSX.Element {
  const [titleColor, setTitleColor] = useState('#f2f2f2')
  
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 40
        ? setTitleColor('#141447')
        : setTitleColor('#f2f2f2')      
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  return (
    <header className={styles.header}>
      <Row className={styles.Row}>
        <Col span={6} className={`${styles.Col} ${styles.ColTitle}`}>
          <h1 style={{ color: titleColor }}>EasyJob</h1>
        </Col>

        <Col span={18} className={`${styles.Col} ${styles.ColButtons}`}>
          <Button
            type='primary'
            size='large'
            className={styles.Button}
          >
            <UserAddOutlined /> Dar Aulas
          </Button>

          <Button
            type='primary'
            size='large'
            className={styles.Button}
          >
            <UserAddOutlined /> Cadastro como pai
          </Button>

          <Button
            type='primary'
            size='large'
            className={styles.Button}
          >
            <UserOutlined /> Login
          </Button>
        </Col>
      </Row>
    </header>
  )
}