import { useApiCall } from "@/hooks";
import { authenticationSelector } from "@/redux";
import { resendVerifySignUp, verifySignUp } from "@/services";
import {
    Button,
    FormElement,
    Input,
    Loading,
    Row,
    Text
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { inputStyles } from "./sign-up.inventory";

export const SignUpVerify = () => {
    const codeRef = useRef<FormElement>(null);

    const router = useRouter();

    const { signUpRequest } = useSelector(authenticationSelector);

    const { loading, setLetCall } = useApiCall({
        callApi: () =>
            verifySignUp(signUpRequest.email, codeRef.current?.value || ""),
        handleError(status, message) {
            if (status === 400) {
                toast.error(message);
            }
        },
        handleSuccess(message) {
            toast.success(message);
            router.push("/login");
        }
    });

    const resultResend = useApiCall({
        callApi: () => resendVerifySignUp(signUpRequest.email),
        handleError(status, message) {
            if (status) {
                toast.error(message);
            }
        },
        handleSuccess(message) {
            toast.success(message);
        }
    });

    const handleVerify = () => {
        setLetCall(true);
    };

    const handleResend = () => {
        resultResend.setLetCall(true);
    };

    return (
        <>
            <Text size={18}>
                Step 4:
                <Text b css={{ marginLeft: 10 }}>
                    Verify your account!
                </Text>
            </Text>
            <Input ref={codeRef} {...inputStyles({})} labelLeft="Code" />
            <Row justify="flex-end">
                <Button auto light onClick={handleResend}>
                    Resend
                </Button>
                <Button disabled={loading} auto onClick={handleVerify}>
                    {loading ? <Loading /> : <>Verify</>}
                </Button>
            </Row>
        </>
    );
};
