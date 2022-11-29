import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { useResponsive } from '@/hooks/useResponsive'
import { generateToken } from '@/lib'
import { getViewPointsSelect } from '@/services'
import { PermissionRequest, PermissionRequestFailure } from '@/types'
import { Collapse, Container, Input, Loading, Switch, Text } from '@nextui-org/react'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { FeatureTablePermission } from './FeatureTable'
import { inputStylesPermission } from './permission.inventory'
import { UserTablePermission } from './UserTable'
import { ViewPointPermission } from './ViewPointPermission'

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
  const translate = useTranslationFunction()
  const [cookies] = useCookies()

  const setListUser = (listUser: string[]) => {
    handleChangeState({ userId: listUser })
  }
  const setListFeature = (listFeature: string[]) => {
    handleChangeState({ featureId: listFeature })
  }
  const setViewPoints = (listView: { [key: string]: string[] }) => {
    handleChangeState({ viewPoints: { ...permissionState.viewPoints, ...listView } })
  }

  const permissionName = useTranslation('permissionName')

  const skipAccessability = useTranslation('skipAccessability')

  const selectUser = useTranslation('selectUser')
  const selectFeature = useTranslation('selectFeature')

  const viewPointsResult = useApiCall<{ [key: string]: string[] }, String>({
    callApi: () =>
      getViewPointsSelect(
        generateToken({
          userId: cookies.userId,
          deviceId: cookies.deviceId,
        })
      ),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  useEffect(() => {
    viewPointsResult.setLetCall(true)
  }, [])

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
            {...inputStylesPermission({ error: errorState?.name && translate(errorState.name) })}
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
        <Collapse.Group>
          <Collapse title={selectUser}>
            <UserTablePermission
              editAble={editAble?.userId}
              listUser={permissionState.userId}
              setListUser={setListUser}
            />
          </Collapse>
          <Collapse title={selectFeature}>
            <FeatureTablePermission
              editAble={editAble?.featureId}
              listFeature={permissionState.featureId}
              setListFeature={setListFeature}
            />
          </Collapse>
          {viewPointsResult.loading ? (
            <Container css={{ textAlign: 'center', marginTop: 20 }} justify="center">
              <Loading />
            </Container>
          ) : (
            Object.keys(viewPointsResult?.data?.result ?? []).map((viewPoint) => (
              <Collapse key={viewPoint} title={viewPoint}>
                <ViewPointPermission
                  listViewPoint={viewPointsResult.data?.result?.[viewPoint] ?? []}
                  listViewChecked={permissionState.viewPoints?.[viewPoint] ?? []}
                  setListViewPoint={setViewPoints}
                  editAble={editAble?.viewPoints}
                  keyObj={viewPoint}
                />
              </Collapse>
            ))
          )}
        </Collapse.Group>
      </div>
    </div>
  )
}
