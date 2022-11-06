import { PermissionRequest, PermissionRequestFailure } from '@/types'
import { Container, Grid, Input, Switch, Text } from '@nextui-org/react'
import { FeatureTablePermission } from './FeatureTable'
import { inputStylesPermission } from './permission.inventory'
import { UserTablePermission } from './UserTable'

interface IModifierPermission {
  handleChangeState: (newUpdate: Partial<PermissionRequest>) => void
  permissionState: PermissionRequest
  editAble?: Partial<Record<keyof PermissionRequest, boolean>>
  errorState?: Partial<PermissionRequestFailure>
}

export const ModifierPermission = ({
  handleChangeState,
  permissionState,
  editAble,
  errorState,
}: IModifierPermission) => {
  const setListUser = (listUser: string[]) => {
    handleChangeState({ userId: listUser })
  }
  const setListFeature = (listFeature: string[]) => {
    handleChangeState({ featureId: listFeature })
  }

  return (
    <>
      <Grid.Container gap={10}>
        <Grid md={6} xs={12}>
          <Input
            css={{ width: '100%' }}
            value={permissionState.name}
            label="Permission Name"
            readOnly={!editAble?.name}
            onChange={(event) => {
              handleChangeState({
                name: event.currentTarget.value,
              })
            }}
            {...inputStylesPermission({ error: errorState?.name })}
          />
        </Grid>
        <Grid md={6} xs={12}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            <Text>Skip Accessability</Text>
            <Switch
              checked={permissionState.skipAccessability === 0}
              onChange={() => {
                handleChangeState({
                  skipAccessability: permissionState.skipAccessability === 1 ? 1 : 0,
                })
              }}
            />
          </div>
        </Grid>
      </Grid.Container>
      <Container css={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
        <UserTablePermission
          editAble={editAble?.userId}
          listUser={permissionState.userId}
          setListUser={setListUser}
        />
        <FeatureTablePermission
          editAble={editAble?.featureId}
          listFeature={permissionState.featureId}
          setListFeature={setListFeature}
        />
      </Container>
    </>
  )
}
