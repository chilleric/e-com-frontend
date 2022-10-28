import { Container } from '@nextui-org/react';
import { NavBar } from '../navbar';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <Container fluid>{children}</Container>
    </>
  );
};

export { DefaultLayout };
