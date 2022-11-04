import { DatePicker, SelectCustom } from '@/components'
import { genderList } from '@/lib'
import { UserDetailFailure, UserResponseSuccess } from '@/types'
import { Card, Grid, Input, Text } from '@nextui-org/react'
import { inputStylesUser } from './User.inventory'

interface IUserForm {
  user: UserResponseSuccess
  type: 'read' | 'create' | 'update'
  onchangeUserState: Function
  errorState?: UserDetailFailure
}

export const UserForm = ({ user, onchangeUserState, type, errorState }: IUserForm) => {
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
          readOnly
          {...inputStylesUser({
            error: errorState?.email,
          })}
        />
      </Grid>
      <Grid md={4}>
        <Input
          css={{ width: '100%' }}
          value={user.modified}
          label="modified"
          readOnly
          {...inputStylesUser({
            error: errorState?.email,
          })}
        />
      </Grid>
      <Grid md={4}>
        <Input
          css={{ width: '100%' }}
          value={user.username}
          label="username"
          readOnly={type !== 'create'}
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
          readOnly={type === 'read'}
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
          readOnly={type === 'read'}
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
          readOnly={type === 'read'}
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
          disable={type === 'read'}
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
          disabled={type === 'read'}
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
          readOnly={type === 'read'}
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
          readOnly={type === 'read'}
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
