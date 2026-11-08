import { useState } from "react";

import { register } from "../services/auth.service";
import { type RegisterInput } from "../types/auth.types";

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);

  async function submit(input: RegisterInput) {
    setIsLoading(true);

    try {
      const session = await register(input);
      if (!session.token || !session.user.id) {
        throw new Error("Registration did not return a valid session.");
      }
      return session;
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, submit };
}
