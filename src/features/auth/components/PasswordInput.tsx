import { AppInput } from "@/components/ui/AppInput";

type PasswordInputProps = {
  onChangeText?: (value: string) => void;
  value?: string;
};

export function PasswordInput(props: PasswordInputProps) {
  return <AppInput autoCapitalize="none" secureTextEntry textContentType="password" {...props} />;
}
