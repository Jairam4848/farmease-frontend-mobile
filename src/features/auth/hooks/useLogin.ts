import { useState } from "react";

import { login } from "../services/auth.service";
import { type LoginInput } from "../types/auth.types";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);

  async function submit(input: LoginInput) {
    setIsLoading(true);

    try {
      return await login(input);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, submit };
}
