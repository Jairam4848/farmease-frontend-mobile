import { AuthShell } from "../components/AuthShell";
import { RegisterForm } from "../components/RegisterForm";

export function RegisterScreen() {
  return (
    <AuthShell
      title="Make room"
      accent="for growth."
      chapter="02 / YOUR NEXT CHAPTER"
      introduction="From your first seed to a world of possibilities."
    >
      <RegisterForm />
    </AuthShell>
  );
}
