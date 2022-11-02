import { CommonResponseType } from '@/types';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export const useApiCall = <T, E>({
  callApi,
  handleError,
  handleSuccess,
}: {
  callApi: () => Promise<AxiosResponse<any, any>>;
  handleError?: (status: number) => void;
  handleSuccess?: (message: string) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<CommonResponseType<T>>();
  const [error, setError] = useState<CommonResponseType<E>>();
  const [letCall, setLetCall] = useState<boolean>(false);

  const getData = async () => {
    const response = await callApi();
    const { success } = response.data;
    if (success) {
      setData(response.data);
      setError(undefined);
      if (handleSuccess) {
        handleSuccess(response.data.message);
      }
    } else {
      const { statusCode } = response.data;
      if (statusCode === 400) {
        setData(undefined);
        setError(response.data);
      }
      if (handleError) {
        handleError(statusCode);
      }
    }
    setLoading(false);
    setLetCall(false);
  };

  useEffect(() => {
    if (letCall) {
      setLoading(true);
      getData();
    }
  }, [letCall]);

  const handleReset = () => {
    setLoading(false);
    setData(undefined);
    setError(undefined);
    setLetCall(false);
  };

  return {
    handleReset,
    setLetCall,
    loading,
    data,
    error,
  };
};
