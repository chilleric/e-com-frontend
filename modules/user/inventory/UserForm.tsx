import { DatePicker, SelectCustom } from '@/components'
import { genderList } from '@/lib'
import { UserDetailFailure, UserResponseSuccess } from '@/types'
import { Card, Grid, Input, Text } from '@nextui-org/react'
import { inputStylesUser } from './User.inventory'

interface IUserForm {
  user: UserResponseSuccess
  onchangeUserState: Function
  errorState?: Partial<UserDetailFailure>
  editAble?: Partial<Record<keyof UserResponseSuccess, boolean>>
}

export const UserForm = ({ user, onchangeUserState, errorState, editAble }: IUserForm) => {
  return (
    <Grid.Container gap={4} justify="center">
      <Grid xs={12} sm={4}>
        <Card css={{ $$cardColor: user.verified ? '$colors$success' : '$colors$primary' }}>
          <Card.Body>
            <Text>{'Verified'.toUpperCase()}</Text>
          </Card.Body>
        </Card>
      </Grid>
      <Grid md={4}>
        <Input
          css={{ width: '100%' }}
          value={user.created}
          label="created"
          readOnly={!editAble?.created}
          {...inputStylesUser({
            error: errorState?.created,
          })}
        />
      </Grid>
      <Grid md={4}>
        <Input
          css={{ width: '100%' }}
          value={user.modified}
          label="modified"
          readOnly={!editAble?.modified}
          {...inputStylesUser({
            error: errorState?.modified,
          })}
        />
      </Grid>
      <Grid md={4}>
        <Input
          css={{ width: '100%' }}
          value={user.username}
          label="username"
          readOnly={!editAble?.username}
          onChange={(event) => {
            onchangeUserState({
              username: event.currentTarget.value,
            })
          }}
          {...inputStylesUser({ error: errorState?.username })}
        />
      </Grid>
      <Grid md={4}>
        <Input
          css={{ width: '100%' }}
          value={user.address}
          label="address"
          readOnly={!editAble?.address}
          onChange={(event) => {
            onchangeUserState({
              address: event.currentTarget.value,
            })
          }}
          {...inputStylesUser({ error: errorState?.address })}
        />
      </Grid>
      <Grid md={4}>
        <Input
          css={{ width: '100%' }}
          value={user.firstName}
          label="first name"
          readOnly={!editAble?.firstName}
          onChange={(event) => {
            onchangeUserState({
              firstName: event.currentTarget.value,
            })
          }}
          {...inputStylesUser({ error: errorState?.firstName })}
        />
      </Grid>
      <Grid md={4}>
        <Input
          css={{ width: '100%' }}
          value={user.lastName}
          label="last name"
          readOnly={!editAble?.lastName}
          onChange={(event) => {
            onchangeUserState({
              lastName: event.currentTarget.value,
            })
          }}
          {...inputStylesUser({ error: errorState?.lastName })}
        />
      </Grid>
      <Grid md={4}>
        <DatePicker
          value={user.dob}
          label="date of birth"
          onChange={(event: string) => {
            onchangeUserState({
              dob: event,
            })
          }}
          buttonProps={inputStylesUser({
            error: errorState?.dob,
          })}
          disable={!editAble?.dob}
        />
      </Grid>
      <Grid md={4}>
        <SelectCustom
          value={user.gender}
          onChange={(value: number) => {
            onchangeUserState({
              gender: value,
            })
          }}
          label="gender"
          disabled={!editAble?.gender}
          options={genderList}
          buttonProps={inputStylesUser({
            error: errorState?.gender,
          })}
        />
      </Grid>
      <Grid md={4}>
        <Input
          css={{ width: '100%' }}
          value={user.phone}
          label="phone"
          readOnly={!editAble?.phone}
          onChange={(event) => {
            onchangeUserState({
              phone: event.currentTarget.value,
            })
          }}
          {...inputStylesUser({ error: errorState?.phone })}
        />
      </Grid>
      <Grid md={4}>
        <Input
          css={{ width: '100%' }}
          value={user.email}
          label="email"
          readOnly={!editAble?.email}
          onChange={(event) => {
            onchangeUserState({
              email: event.currentTarget.value,
            })
          }}
          {...inputStylesUser({ error: errorState?.email })}
        />
      </Grid>
    </Grid.Container>
  )
}
