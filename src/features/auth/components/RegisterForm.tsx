import { useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { router } from "expo-router";

import { useRegister } from "../hooks/useRegister";
import { getRegisterErrors, type RegisterErrors } from "../schemas/auth.schema";
import { AuthError, AuthSubmit, AuthSwitch, formStyles } from "./AuthActions";
import { AuthField } from "./AuthField";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);
  const { isLoading, submit } = useRegister();

  function clearError(field: keyof RegisterErrors) {
    setErrors((current) => ({ ...current, [field]: undefined }));
    setServerError(null);
  }

  async function handleSubmit() {
    if (isLoading) return;
    const input = { name: name.trim(), email: email.trim(), password };
    const nextErrors = getRegisterErrors(input, confirmPassword);
    setErrors(nextErrors);
    setServerError(null);
    if (Object.keys(nextErrors).length) return;
    try {
      await submit(input);
      router.replace("/(tabs)");
    } catch {
      setServerError(
        "We couldn't create your account right now. Please try again.",
      );
    }
  }

  return (
    <View>
      <Text accessibilityRole="header" style={formStyles.heading}>
        A fresh start. All yours.
      </Text>
      <Text style={formStyles.introduction}>
        Create your FarmEase account in a few simple steps.
      </Text>
      <View style={formStyles.form}>
        <AuthField
          label="Full name"
          placeholder="Your full name"
          value={name}
          onChangeText={(value) => {
            setName(value);
            clearError("name");
          }}
          error={errors.name}
          editable={!isLoading}
          autoComplete="name"
          autoCapitalize="words"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => emailRef.current?.focus()}
        />
        <AuthField
          label="Email address"
          placeholder="you@example.com"
          inputRef={emailRef}
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            clearError("email");
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
          placeholder="Create a password"
          password
          inputRef={passwordRef}
          value={password}
          onChangeText={(value) => {
            setPassword(value);
            clearError("password");
            clearError("confirmPassword");
          }}
          error={errors.password}
          hint="At least 8 characters."
          editable={!isLoading}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="new-password"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => confirmRef.current?.focus()}
        />
        <AuthField
          label="Confirm password"
          placeholder="Re-enter your password"
          password
          inputRef={confirmRef}
          value={confirmPassword}
          onChangeText={(value) => {
            setConfirmPassword(value);
            clearError("confirmPassword");
          }}
          error={errors.confirmPassword}
          editable={!isLoading}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="new-password"
          returnKeyType="go"
          onSubmitEditing={handleSubmit}
        />
        <AuthError message={serverError} />
        <AuthSubmit
          title="Create account"
          loading={isLoading}
          onPress={handleSubmit}
        />
      </View>
      <AuthSwitch registering />
    </View>
  );
}
