import { useEffect, useState } from 'react'
import { Row, Col, Button, Popover } from 'antd'
import { UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons'

import styles from './styles/header.module.css'
import { Link } from 'react-router-dom'

export interface HeaderProps {
  isLogin?: boolean,
}

export default function Header({ isLogin}: HeaderProps): JSX.Element {
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

  const PopoverContent = (): JSX.Element => {
    const handleLogout = () => {
      console.log('logout')
    }
    return (
      <Button
        onClick={() => handleLogout()}
      >
        <LogoutOutlined />
        Sair
      </Button>
    )
  }

  return (
    <header className={styles.header}>
      <Row className={styles.Row}>
        <Col span={6} className={`${styles.Col} ${styles.ColTitle}`}>
          <h1 style={{ color: titleColor }}>EasyJob</h1>
        </Col>

        <Col span={18} className={`${styles.Col} ${styles.ColButtons}`}>
          {!isLogin ? (
            <>
              <Button
                type='primary'
                size='large'
                className={styles.Button}
              >
                <Link to={`/register?isTeacher=true`}>
                  <UserAddOutlined /> Dar Aulas
                </Link>
              </Button>

              <Button
                type='primary'
                size='large'
                className={styles.Button}
              >
                <Link to={`/register?isTeacher=false`}>
                  <UserAddOutlined /> Cadastro como pai
                </Link>
              </Button>

              <Button
                type='primary'
                size='large'
                className={styles.Button}
              >
                <Link to={`/login`}>
                  <UserOutlined /> Login
                </Link>
              </Button>
            </>
          ) : (
            <Popover
              className={styles.ButtonIsLogin}
              content={<PopoverContent />}
            >
              <UserOutlined />
            </Popover>
          )}
        </Col>
      </Row>
    </header>
  )
}