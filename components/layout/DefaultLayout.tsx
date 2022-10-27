import { Box } from '../';
import { NavBar } from '../navbar';

const DefaultLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <NavBar />
      <Box
        css={{
          maxW: '100%',
          paddingLeft: 10,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export { DefaultLayout };
