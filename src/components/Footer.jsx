import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Container from "@/components/Container";
import Link from "next/link";

export default function Header() {
  return (
    <header className="mt-12 mb-8 ">
      <Container className="flex justify-between gap-4">
        <p className="text-sm">Billinfo &copy; {new Date().getFullYear()}</p>
        <p className="text-sm">
          Created by Abdullahi.Busybrain with Next.js, Xata, Clerk.dev, Stripe,
          Resend, and Vercel
        </p>
      </Container>
    </header>
  );
}
