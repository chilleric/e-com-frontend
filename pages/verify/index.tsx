import { LoginLayout } from '@/components/layout/LoginLayout'
import { VerifyForm } from '@/modules/verify'
import { Modal } from '@nextui-org/react'

const VerifyPage = () => {
  return (
    <LoginLayout>
      <Modal open preventClose>
        <VerifyForm />
      </Modal>
    </LoginLayout>
  )
}

export default VerifyPage
