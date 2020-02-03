export type RegisterUserData = {
  email: string;
  password: string;
  photo: string;
  phone: string;
  address: string;
  dob: string;
  security_answer_1: string;
  security_answer_2: string;
  security_answer_3: string;
};

export type RegisterState = {
  readonly data: RegisterUserData;
  readonly error?: Object;
  readonly loading: boolean;
  readonly success: boolean;
};
