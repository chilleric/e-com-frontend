import { apiRoute } from "@/constants/apiRoutes";
import axiosInstance from "@/lib/axios/request";

export const getListUser = async () => {
  return await axiosInstance.get(apiRoute.user.getListUser);
};
