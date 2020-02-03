export type AuthState = {
  readonly data: {
    email: string;
    password: string;
  };
  readonly error?: Object;
  readonly loading: boolean;
  readonly success: boolean;
  readonly user: string;
};
