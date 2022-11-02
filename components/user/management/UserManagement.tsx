import { CustomTable } from '@/components/table';
import { DEVICE_ID, USER_ID } from '@/constants/auth';
import { useApiCall } from '@/hooks';
import { generateToken } from '@/lib';
import { getListUser } from '@/services';
import { UserListSuccess, UserResponseSuccess } from '@/types';
import { Container, Loading } from '@nextui-org/react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { header } from './management.inventory';

export const UserManagement = () => {
  const [cookies, setCookie, removeCookie] = useCookies([DEVICE_ID, USER_ID]);

  const result = useApiCall<UserListSuccess, String>({
    callApi: () =>
      getListUser(
        generateToken({ userId: cookies.userId, deviceId: cookies.deviceId }),
      ),
    handleError(status) {
      console.log(status);
    },
  });

  useEffect(() => {
    setLetCall(true);
  }, []);

  const { error, data, loading, setLetCall, handleReset } = result;

  console.log(data);

  return (
    <>
      {loading ? (
        <Container
          css={{ textAlign: 'center', marginTop: 20 }}
          justify='center'
        >
          <Loading />
        </Container>
      ) : (
        <CustomTable<UserResponseSuccess>
          header={header}
          body={data ? data.result.data : []}
          selectionMode='multiple'
        >
          <></>
        </CustomTable>
      )}
    </>
  );
};
