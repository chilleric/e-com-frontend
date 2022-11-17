import { DatePicker, SelectCustom } from '@/components'
import { useTranslation, useTranslationFunction } from '@/hooks'
import { useResponsive } from '@/hooks/useResponsive'
import { GenderList } from '@/lib'
import { UserDetailFailure, UserResponseSuccess } from '@/types'
import { Card, Input, Text } from '@nextui-org/react'
import { inputStylesUser } from './User.inventory'

interface IUserForm {
  user: UserResponseSuccess
  onchangeUserState: Function
  errorState?: Partial<UserDetailFailure>
  editAble?: Partial<Record<keyof UserResponseSuccess, boolean>>
}

export const UserForm = ({ user, onchangeUserState, errorState, editAble }: IUserForm) => {
  const breakPoint = useResponsive()
  const translate = useTranslationFunction()

  const usernameLabel = useTranslation('username')
  const modifiedLabel = useTranslation('modified')
  const createLabel = useTranslation('created')
  const addressLabel = useTranslation('address')
  const firstNameLabel = useTranslation('firstName')
  const lastNameLabel = useTranslation('lastName')
  const dobLabel = useTranslation('dob')
  const genderLabel = useTranslation('gender')
  const phoneLabel = useTranslation('phone')
  const emailLabel = useTranslation('email')
  const verifiedLabel = useTranslation('verified')

  const genderList = GenderList()

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${breakPoint}, minmax(0, 1fr))`,
        gap: 16,
      }}
    >
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Card css={{ $$cardColor: user.verified ? '$colors$success' : '$colors$primary' }}>
          <Card.Body>
            <Text>{verifiedLabel.toUpperCase()}</Text>
          </Card.Body>
        </Card>
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          css={{ width: '100%' }}
          value={user.created}
          label={createLabel}
          readOnly={!editAble?.created}
          {...inputStylesUser({
            error: errorState?.created && translate(errorState.created),
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          css={{ width: '100%' }}
          value={user.modified}
          label={modifiedLabel}
          readOnly={!editAble?.modified}
          {...inputStylesUser({
            error: errorState?.modified && translate(errorState.modified),
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          css={{ width: '100%' }}
          value={user.username}
          label={usernameLabel}
          readOnly={!editAble?.username}
          onChange={(event) => {
            onchangeUserState({
              username: event.currentTarget.value,
            })
          }}
          {...inputStylesUser({
            error: errorState?.username && translate(errorState.username),
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          css={{ width: '100%' }}
          value={user.address}
          label={addressLabel}
          readOnly={!editAble?.address}
          onChange={(event) => {
            onchangeUserState({
              address: event.currentTarget.value,
            })
          }}
          {...inputStylesUser({ error: errorState?.address && translate(errorState.address) })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          css={{ width: '100%' }}
          value={user.firstName}
          label={firstNameLabel}
          readOnly={!editAble?.firstName}
          onChange={(event) => {
            onchangeUserState({
              firstName: event.currentTarget.value,
            })
          }}
          {...inputStylesUser({
            error: errorState?.firstName && translate(errorState.firstName),
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          css={{ width: '100%' }}
          value={user.lastName}
          label={lastNameLabel}
          readOnly={!editAble?.lastName}
          onChange={(event) => {
            onchangeUserState({
              lastName: event.currentTarget.value,
            })
          }}
          {...inputStylesUser({ error: errorState?.lastName && translate(errorState.lastName) })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <DatePicker
          value={user.dob}
          label={dobLabel}
          onChange={(event: string) => {
            onchangeUserState({
              dob: event,
            })
          }}
          buttonProps={inputStylesUser({
            error: errorState?.dob && translate(errorState.dob),
          })}
          disable={!editAble?.dob}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <SelectCustom<number>
          value={user.gender}
          onChange={(value) => {
            onchangeUserState({
              gender: value,
            })
          }}
          label={genderLabel}
          disabled={!editAble?.gender}
          options={genderList}
          buttonProps={{
            ...inputStylesUser({
              error: errorState?.gender && translate(errorState.gender),
            }),
            width: '100%',
          }}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          css={{ width: '100%' }}
          value={user.phone}
          label={phoneLabel}
          readOnly={!editAble?.phone}
          onChange={(event) => {
            onchangeUserState({
              phone: event.currentTarget.value,
            })
          }}
          {...inputStylesUser({ error: errorState?.phone && translate(errorState.phone) })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          css={{ width: '100%' }}
          value={user.email}
          label={emailLabel}
          readOnly={!editAble?.email}
          onChange={(event) => {
            onchangeUserState({
              email: event.currentTarget.value,
            })
          }}
          {...inputStylesUser({ error: errorState?.email && translate(errorState.email) })}
        />
      </div>
    </div>
  )
}
