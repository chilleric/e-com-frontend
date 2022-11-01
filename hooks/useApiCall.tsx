import { CommonResponseType } from "@/types";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export const useApiCall = <T, E>({
  callApi,
  handleError,
}: {
  callApi: () => Promise<AxiosResponse<any, any>>;
  handleError?: (status: number) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<CommonResponseType<T>>();
  const [error, setError] = useState<CommonResponseType<E>>();
  const [letCall, setLetCall] = useState<boolean>(false);

  const getData = async () => {
    console.log("!");
    const response = await callApi();
    const { success, status } = response.data;
    if (success) {
      setData(response.data);
      setError(undefined);
    } else {
      if (status === 400) {
        setData(undefined);
        setError(response.data);
      }
      if (handleError) {
        handleError(status);
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
