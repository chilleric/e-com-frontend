import { genderList } from '@/lib'
import { authenticationSelector, setSignUpRequest } from '@/redux'
import { CommonResponseType, SignUpFailure } from '@/types'
import { Dropdown, Input, Text } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { inputStyles } from './sign-up.inventory'

export const SignUpStep2 = ({ error }: { error?: CommonResponseType<SignUpFailure> }) => {
  const dispatch = useDispatch()

  const { signUpRequest } = useSelector(authenticationSelector)

  return (
    <>
      <Text size={18}>
        Step 2:
        <Text b css={{ marginLeft: 10 }}>
          Personal information
        </Text>
      </Text>
      <Input
        value={signUpRequest.firstName}
        onChange={(e) => dispatch(setSignUpRequest({ firstName: e.target.value }))}
        {...inputStyles({ error: error?.result?.firstName })}
        labelLeft="First Name"
      />
      <Input
        value={signUpRequest.lastName}
        onChange={(e) => dispatch(setSignUpRequest({ lastName: e.target.value }))}
        {...inputStyles({ error: error?.result?.lastName })}
        labelLeft="Last Name"
      />
      <Dropdown isBordered>
        <Dropdown.Button>
          Gender : {genderList.find((item) => item.value === signUpRequest.gender)?.label}
        </Dropdown.Button>
        <Dropdown.Menu
          disallowEmptySelection
          selectedKeys={new Set([signUpRequest.gender.toString()])}
          selectionMode="single"
        >
          {genderList.map((item) => (
            <Dropdown.Item key={item.value}>
              <div onClick={() => dispatch(setSignUpRequest({ gender: item.value }))}>
                {item.label}
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Input
        value={signUpRequest.dob}
        onChange={(e) => dispatch(setSignUpRequest({ dob: e.target.value }))}
        {...inputStyles({ error: error?.result?.dob })}
        labelLeft="Date of birth"
      />
    </>
  )
}
