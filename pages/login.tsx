import { LoginForm } from "@/components";
import { LoginLayout } from "@/components/layout/LoginLayout";
import { Modal } from "@nextui-org/react";

const Login = () => {
    return (
        <LoginLayout>
            <Modal open={true} preventClose>
                <LoginForm />
            </Modal>
        </LoginLayout>
    );
};

export default Login;
