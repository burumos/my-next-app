import LoginForm from "../components/login/form";

export default function LoginPage() {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="max-w-96 w-full">
        <LoginForm />
      </div>
    </main>
  );
}
