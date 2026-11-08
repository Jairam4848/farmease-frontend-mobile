import { AuthShell } from "../components/AuthShell";
import { LoginForm } from "../components/LoginForm";

export function LoginScreen() {
  return (
    <AuthShell
      title="Good to"
      accent="see you."
      chapter="01 / WELCOME BACK"
      introduction="Your land. Your people. Your possibilities."
    >
      <LoginForm />
    </AuthShell>
  );
}
