export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponseSuccess = {
  userId: string;
  deviceId: string;
  verify2Fa: boolean;
};

export type LoginResponseFailure = Record<keyof LoginRequest, string>;
