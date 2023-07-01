import { SearchOutlined, ContactsOutlined, CommentOutlined } from '@ant-design/icons'

import styles from '../styles/learn.module.css'
import { Col, Row } from 'antd'

export default function Learn(): JSX.Element {
  interface LearnDivContent {
    title: string,
    description: string,
    img: JSX.Element,
    isOdd: boolean
  }

  const learnDivContent: Array<LearnDivContent> = [
    {
      title: 'Procure',
      description: 'Consulte livremente os perfis e entre em contato com o professor ideal de acordo com os seus critérios',
      img: <SearchOutlined className={styles.learnIcon} />,
      isOdd: true
    },
    {
      title: 'Conheça',
      description: 'Conheça o professor através do seu perfil e descubra se ele é o professor ideal para você',
      img: <ContactsOutlined className={styles.learnIcon} />,
      isOdd: false
    },
    {
      title: 'Contate',
      description: 'Rápido e fácil, os professores respondem em algumas horas! E se você não conseguir encontrar o professor perfeito, a nossa equipe está sempre pronta pra ajudar.',
      img: <CommentOutlined className={styles.learnIcon} />,
      isOdd: true
    }
  ]
  
  return (
    <>
      {learnDivContent.map(
        ({
          title,
          description,
          img,
          isOdd
        }, index) => (
          <Row
            className={styles.learnDiv}
            style={{ flexDirection: isOdd ? 'row' : 'row-reverse' }}
            key={index}
          >
            <Col span={14} className={styles.learnTab}>
              <h1>{index+1}. {title}</h1>
              <h4>{description}</h4>
            </Col>

            <Col
              span={10}
              className={`${styles.learnTab} ${styles.learnImg}`}
            >
              {img}
            </Col>
          </Row>
        )
      )}
    </>
  )
}