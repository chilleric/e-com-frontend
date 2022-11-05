import { GeneralSettings, UpdateAcount } from './inventory'
import { UpdatePassword } from './inventory/UpdatePassword'

export const Settings = () => {
  return (
    <div
      style={{ marginTop: 18, marginBottom: 80, display: 'flex', flexDirection: 'column', gap: 40 }}
    >
      <GeneralSettings />
      <UpdateAcount />
      <UpdatePassword />
    </div>
  )
}
