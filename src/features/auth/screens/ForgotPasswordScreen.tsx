import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";

import { AuthError, AuthSubmit, formStyles } from "../components/AuthActions";
import { AuthField } from "../components/AuthField";
import { AuthShell } from "../components/AuthShell";
import { getLoginErrors } from "../schemas/auth.schema";

export function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [notice, setNotice] = useState<string | null>(null);

  function handleSubmit() {
    const emailError = getLoginErrors({
      email: email.trim(),
      password: "_",
    }).email;
    setError(emailError);
    setNotice(null);
    if (!emailError)
      setNotice("Password reset is not available yet. Please try again later.");
  }

  return (
    <AuthShell
      title="A little help"
      accent="getting in."
      chapter="LET'S GET YOU BACK"
      introduction="A new password. The same possibilities."
    >
      <Text accessibilityRole="header" style={formStyles.heading}>
        Forgot your password?
      </Text>
      <Text style={formStyles.introduction}>
        Enter the email address linked to your account.
      </Text>
      <View style={formStyles.form}>
        <AuthField
          label="Email address"
          placeholder="you@example.com"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setError(undefined);
            setNotice(null);
          }}
          error={error}
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="go"
          onSubmitEditing={handleSubmit}
        />
        <AuthError message={notice} />
        <AuthSubmit title="Send reset link" onPress={handleSubmit} />
        <Link href="/(auth)/login" replace asChild>
          <Pressable accessibilityRole="link" style={formStyles.forgotLink}>
            <Text style={formStyles.linkText}>← Back to log in</Text>
          </Pressable>
        </Link>
      </View>
    </AuthShell>
  );
}
