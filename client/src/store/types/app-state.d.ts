import { LoginState } from "./";
import { RegisterState } from "./";
import { UserState } from "./";
import { AuthState } from "./";

export type AppState = {
  login: LoginState;
  register: RegisterState;
  user: UserState;
  auth: AuthState;
};
