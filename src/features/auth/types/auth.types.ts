export type AuthUser = {
  email: string;
  id: string;
  name: string;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = LoginInput & {
  name: string;
};
