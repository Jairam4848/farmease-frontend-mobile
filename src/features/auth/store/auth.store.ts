import { type AuthSession } from "../types/auth.types";

export type AuthState = {
  session: AuthSession | null;
};

export const initialAuthState: AuthState = {
  session: null,
};
