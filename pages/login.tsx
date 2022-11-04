import { LoginLayout } from '@/components/layout/LoginLayout'
import { LoginForm } from '@/modules'
import { Modal } from '@nextui-org/react'

const Login = () => {
  return (
    <LoginLayout>
      <Modal open={true} preventClose>
        <LoginForm />
      </Modal>
    </LoginLayout>
  )
}

export default Login
