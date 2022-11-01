import { DEVICE_ID, USER_ID } from "@/constants/auth";
import { useApiCall } from "@/hooks";
import { encodeBase64 } from "@/lib";
import { login } from "@/services";
import { LoginResponseFailure, LoginResponseSuccess } from "@/types/auth";
import {
  Button,
  FormElement,
  Input,
  Loading,
  Modal,
  Row,
  Text,
  useTheme,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { inputStyles } from "./login.inventory";

export const LoginForm = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  const emailRef = useRef<FormElement>(null);
  const passwordRef = useRef<FormElement>(null);
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies([DEVICE_ID, USER_ID]);

  const handleChangeTheme = () => {
    if (isDark) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const result = useApiCall<LoginResponseSuccess, LoginResponseFailure>({
    callApi: () =>
      login({
        username: emailRef.current ? emailRef.current.value : "",
        password: encodeBase64(
          passwordRef.current ? passwordRef.current.value : ""
        ),
      }),
  });

  const { error, data, loading, setLetCall, handleReset } = result;
  console.log(data);

  const handleLogin = () => {
    setLetCall(true);
  };

  useEffect(() => {
    if (data) {
      setCookie(DEVICE_ID, data.result.deviceId, { path: "/" });
      setCookie(USER_ID, data.result.userId, { path: "/" });
      router.push("/");
    }
  }, [data]);

  return (
    <>
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Welcome
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          ref={emailRef}
          {...inputStyles({ error: error?.result?.username })}
          labelLeft="username"
          onFocus={handleReset}
        />
        <Input
          ref={passwordRef}
          {...inputStyles({ error: error?.result?.password })}
          type="password"
          labelLeft="password"
          onFocus={handleReset}
        />
        <Row justify="flex-end">
          <Button auto light>
            Forgot password?
          </Button>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat onClick={handleChangeTheme}>
          Change theme
        </Button>
        <Button disabled={loading} auto onClick={handleLogin}>
          {loading ? <Loading /> : <>Sign in</>}
        </Button>
      </Modal.Footer>
    </>
  );
};
