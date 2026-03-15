import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#F5F7F4_0%,#E8EFEA_100%)] px-4 py-10 md:px-6">
      <div className="w-full max-w-6xl">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
