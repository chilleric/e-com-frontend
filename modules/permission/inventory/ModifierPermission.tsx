import { useTranslation } from '@/hooks'
import { useResponsive } from '@/hooks/useResponsive'
import { PermissionRequest, PermissionRequestFailure } from '@/types'
import { Input, Switch, Text } from '@nextui-org/react'
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
  const breakPoint = useResponsive()

  const setListUser = (listUser: string[]) => {
    handleChangeState({ userId: listUser })
  }
  const setListFeature = (listFeature: string[]) => {
    handleChangeState({ featureId: listFeature })
  }

  const permissionName = useTranslation('permissionName')

  const skipAccessability = useTranslation('skipAccessability')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${breakPoint > 1 ? 2 : 1}, minmax(0, 1fr))`,
          gap: 40,
        }}
      >
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            css={{ width: '100%' }}
            value={permissionState.name}
            label={permissionName}
            readOnly={!editAble?.name}
            onChange={(event) => {
              handleChangeState({
                name: event.currentTarget.value,
              })
            }}
            {...inputStylesPermission({ error: errorState?.name })}
          />
        </div>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 40,
              gridColumn: 'span 1 / span 1',
            }}
          >
            <Text>{skipAccessability}</Text>
            <Switch
              disabled={!editAble?.skipAccessability}
              checked={permissionState.skipAccessability === 0}
              onChange={() => {
                handleChangeState({
                  skipAccessability: permissionState.skipAccessability === 1 ? 0 : 1,
                })
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
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
      </div>
    </div>
  )
}
