import { LoginForm } from "@/components/LoginForm/LoginForm";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <LoginForm />
    </div>
  );
}
