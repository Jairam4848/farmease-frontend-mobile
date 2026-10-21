import { type AuthSession, type LoginInput, type RegisterInput } from "../types/auth.types";

export async function login(input: LoginInput): Promise<AuthSession> {
  return {
    token: "",
    user: {
      email: input.email,
      id: "",
      name: "",
    },
  };
}

export async function register(input: RegisterInput): Promise<AuthSession> {
  return {
    token: "",
    user: {
      email: input.email,
      id: "",
      name: input.name,
    },
  };
}
