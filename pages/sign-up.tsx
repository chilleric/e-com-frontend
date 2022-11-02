import { LoginLayout } from "@/components/layout/LoginLayout";
import { SignUpForm } from "@/modules";
import { Modal } from "@nextui-org/react";

const SignUpPage = () => {
    return (
        <LoginLayout>
            <Modal open={true} preventClose>
                <SignUpForm />
            </Modal>
        </LoginLayout>
    );
};

export default SignUpPage;
