"use client";
import { useSession } from "./lib/auth-client";

export default function Home() {
  const { data: session, isPending } = useSession();

  console.log(session?.user.email);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      Hey there
    </div>
  );
}
