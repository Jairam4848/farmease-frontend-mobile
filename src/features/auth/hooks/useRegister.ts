import { useState } from "react";

import { register } from "../services/auth.service";
import { type RegisterInput } from "../types/auth.types";

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);

  async function submit(input: RegisterInput) {
    setIsLoading(true);

    try {
      return await register(input);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, submit };
}
