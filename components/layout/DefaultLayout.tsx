import { NavBar } from '../navbar'

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <div style={{ maxWidth: 1400, padding: '0 24px', margin: 'auto' }}>{children}</div>
    </>
  )
}

export { DefaultLayout }
