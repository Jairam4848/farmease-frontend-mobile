import { type LoginInput, type RegisterInput } from "../types/auth.types";

export function isLoginInput(value: LoginInput): value is LoginInput {
  return Boolean(value.email && value.password);
}

export function isRegisterInput(value: RegisterInput): value is RegisterInput {
  return Boolean(value.email && value.name && value.password);
}
