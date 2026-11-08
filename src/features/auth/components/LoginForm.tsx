import { useRef, useState } from "react";
import { Pressable, TextInput, View, Text } from "react-native";
import { Link, router } from "expo-router";

import { useLogin } from "../hooks/useLogin";
import { getLoginErrors, type LoginErrors } from "../schemas/auth.schema";
import { AuthError, AuthSubmit, AuthSwitch, formStyles } from "./AuthActions";
import { AuthField } from "./AuthField";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const passwordRef = useRef<TextInput>(null);
  const { isLoading, submit } = useLogin();

  async function handleSubmit() {
    if (isLoading) return;
    const input = { email: email.trim(), password };
    const nextErrors = getLoginErrors(input);
    setErrors(nextErrors);
    setServerError(null);
    if (Object.keys(nextErrors).length) return;
    try {
      await submit(input);
      router.replace("/(tabs)");
    } catch {
      setServerError(
        "We couldn't log you in. Please check your details and try again.",
      );
    }
  }

  return (
    <View>
      <Text accessibilityRole="header" style={formStyles.heading}>
        Your farm, one login away.
      </Text>
      <Text style={formStyles.introduction}>Pick up where you left off.</Text>
      <View style={formStyles.form}>
        <AuthField
          label="Email address"
          placeholder="you@example.com"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setErrors((current) => ({ ...current, email: undefined }));
            setServerError(null);
          }}
          error={errors.email}
          editable={!isLoading}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          autoComplete="email"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <AuthField
          label="Password"
          placeholder="Enter your password"
          password
          inputRef={passwordRef}
          value={password}
          onChangeText={(value) => {
            setPassword(value);
            setErrors((current) => ({ ...current, password: undefined }));
            setServerError(null);
          }}
          error={errors.password}
          editable={!isLoading}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="current-password"
          returnKeyType="go"
          onSubmitEditing={handleSubmit}
        />
        <View style={formStyles.forgotRow}>
          <Link href="/(auth)/forgot-password" asChild>
            <Pressable accessibilityRole="link" style={formStyles.forgotLink}>
              <Text style={formStyles.linkText}>Forgot password?</Text>
            </Pressable>
          </Link>
        </View>
        <AuthError message={serverError} />
        <AuthSubmit title="Log in" loading={isLoading} onPress={handleSubmit} />
      </View>
      <AuthSwitch />
    </View>
  );
}
