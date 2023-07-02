import { Form, Input } from 'antd'
import {
  UserOutlined, 
  WhatsAppOutlined,
  IdcardOutlined,
  ClockCircleOutlined
} from '@ant-design/icons'

import styles from '../styles/registerForm.module.css'

export default function RegisterFormTeacher(): JSX.Element {
  const [formTeacher] = Form.useForm()

  return (
    <Form
      className={styles.formRegister}
      name="login"
      autoComplete=''
      layout='vertical'
      form={formTeacher}
    >
      <Form.Item
        className={styles.formItem}
        label="Cidade"
        name="ciry"
        rules={[{ required: true, message: 'Por favor, insira sua cidade!' }]}
      >
        <Input
          className={styles.inputRegister}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Insira sua cidade"
        />
      </Form.Item>

      <Form.Item
        className={styles.formItem}
        label="WhatsApp"
        name="whatsapp"
        rules={[{ required: true, message: 'Por favor, insira seu número!' }]}
      >
        <Input
          className={styles.inputRegister}
          prefix={<WhatsAppOutlined className="site-form-item-icon" />}
          placeholder="insira seu número"
        />
      </Form.Item>

      <Form.Item
        className={styles.formItem}
        label="Sobre você"
        hasFeedback
        name="aboutyou"
        rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
      >
        <Input.TextArea
          className={styles.inputRegisterTextarea}
          placeholder="Sobre você"
        />
      </Form.Item>

      <h1 className={styles.aboutClass}>Sobre as aulas</h1>

      <Form.Item
        className={styles.formItem}
        label="Custo da hora por aula"
        name="perhour"
        rules={[{ required: true, message: 'Por favor, insira seu custo por hora!' }]}
      >
        <Input
          className={styles.inputRegister}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Custo da hora por aula"
        />
      </Form.Item>

      <Form.Item
        className={styles.formItem}
        label="Materia"
        name="materia"
        rules={[{ required: true, message: 'Por favor, insira seu materia!' }]}
      >
        <Input
          className={styles.inputRegister}
          prefix={<IdcardOutlined className="site-form-item-icon" />}
          placeholder="Materia"
        />
      </Form.Item>

      <h1 className={styles.aboutClass}>Horário</h1>

      <Form.Item
        className={styles.formItem}
        label="Horario disponivel"
        name="AvailableTime"
        rules={[{ required: true, message: 'Por favor, insira seu horário!' }]}
      >
        <Input
          className={styles.inputRegister}
          prefix={<ClockCircleOutlined className="site-form-item-icon" />}
          placeholder="Horario disponivel"
        />
      </Form.Item>
    </Form>
  )
}