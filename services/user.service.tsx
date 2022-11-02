import { apiRoute } from "@/constants/apiRoutes";
import axiosInstance from "@/lib/axios/request";

export const getListUser = (token: string) => {
    return axiosInstance.get(apiRoute.user.getListUser, {
        headers: {
            Authorization: token
        }
    });
};
