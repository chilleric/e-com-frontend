import { authenticationSelector, setSignUpRequest } from '@/redux';
import { CommonResponseType, SignUpFailure } from '@/types';
import { Input, Text } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { inputStyles } from './sign-up.inventory';

export const SignUpStep3 = ({
  error,
}: {
  error?: CommonResponseType<SignUpFailure>;
}) => {
  const dispatch = useDispatch();

  const { signUpRequest } = useSelector(authenticationSelector);

  return (
    <>
      <Text size={18}>
        Step 3:
        <Text b css={{ marginLeft: 10 }}>
          Contact information
        </Text>
      </Text>
      <Input
        value={signUpRequest.phone}
        onChange={(e) => dispatch(setSignUpRequest({ phone: e.target.value }))}
        {...inputStyles({ error: error?.result?.phone })}
        labelLeft='Phone'
      />
      <Input
        value={signUpRequest.email}
        onChange={(e) => dispatch(setSignUpRequest({ email: e.target.value }))}
        {...inputStyles({ error: error?.result?.email })}
        labelLeft='Email'
      />
      <Input
        value={signUpRequest.address}
        onChange={(e) =>
          dispatch(setSignUpRequest({ address: e.target.value }))
        }
        {...inputStyles({ error: error?.result?.address })}
        labelLeft='Address'
      />
    </>
  );
};
