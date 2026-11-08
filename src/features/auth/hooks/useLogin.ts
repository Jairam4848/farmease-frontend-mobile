import { useState } from "react";

import { login } from "../services/auth.service";
import { type LoginInput } from "../types/auth.types";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);

  async function submit(input: LoginInput) {
    setIsLoading(true);

    try {
      const session = await login(input);
      if (!session.token || !session.user.id) {
        throw new Error("Login did not return a valid session.");
      }
      return session;
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, submit };
}
