import { NavBarChat } from '../navbar/NavBarChat'

export const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBarChat />
      <div style={{ maxWidth: 1400, padding: '0 24px', margin: 'auto' }}>{children}</div>
    </>
  )
}
