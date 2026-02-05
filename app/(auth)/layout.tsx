import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950">
      <Link href="/" className="flex flex-col items-center gap-3 mb-8">
        <div className="relative w-16 h-16 rounded-full bg-white overflow-hidden">
          <Image
            src="/kottioDev/face.PNG"
            alt="kottioDev"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white uppercase tracking-wide">
            Kottio.Dev
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-xl font-semibold text-emerald-400">
            Data Builder Academy
          </span>
        </div>
      </Link>
      <div className="w-full max-w-md px-4">{children}</div>
    </div>
  );
}
