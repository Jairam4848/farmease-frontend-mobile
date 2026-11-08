import { type LoginInput, type RegisterInput } from "../types/auth.types";

export type LoginErrors = Partial<Record<keyof LoginInput, string>>;
export type RegisterErrors = Partial<
  Record<keyof RegisterInput | "confirmPassword", string>
>;

export function getLoginErrors(value: LoginInput): LoginErrors {
  const errors: LoginErrors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!value.password) errors.password = "Enter your password.";
  return errors;
}

export function getRegisterErrors(
  value: RegisterInput,
  confirmPassword: string,
): RegisterErrors {
  const errors: RegisterErrors = getLoginErrors(value);
  if (value.name.trim().length < 2) errors.name = "Enter your full name.";
  if (value.password.length < 8) errors.password = "Use at least 8 characters.";
  if (!confirmPassword) errors.confirmPassword = "Confirm your password.";
  else if (value.password !== confirmPassword)
    errors.confirmPassword = "Passwords don't match.";
  return errors;
}

export function isLoginInput(value: LoginInput): value is LoginInput {
  return Object.keys(getLoginErrors(value)).length === 0;
}

export function isRegisterInput(value: RegisterInput): value is RegisterInput {
  return (
    isLoginInput(value) &&
    value.name.trim().length >= 2 &&
    value.password.length >= 8
  );
}
