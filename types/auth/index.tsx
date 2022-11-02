export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponseSuccess {
  userId: string;
  deviceId: string;
  verify2Fa: boolean;
}

export type LoginResponseFailure = Record<keyof LoginRequest, string>;

export interface SignUpRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: number;
  dob: string;
  phone: string;
  email: string;
  address: string;
}

export type SignUpFailure = Record<keyof SignUpRequest, string>;
