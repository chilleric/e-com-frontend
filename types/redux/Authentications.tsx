import { SignUpRequest } from "../auth";

export type AuthenticationStoreTypes = {
    userId: string;
    deviceId: string;
    signUpRequest: SignUpRequest;
};
