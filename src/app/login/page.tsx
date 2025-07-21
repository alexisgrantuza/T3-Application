import { LoginForm } from "~/app/_components/login-form";
import { HydrateClient } from "~/trpc/server";

export default function LoginPage() {
  return (
    <HydrateClient>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <LoginForm />
        </div>
      </div>
    </HydrateClient>
  );
}
