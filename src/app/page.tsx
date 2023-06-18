"use client";
import { useAuthContext } from "@/context/auth-provider";
import BaseLayout from "@/layouts/base-layout";

export default function Home() {
  const { state, dispatch } = useAuthContext();
  const { isAuthenticated } = state;
  console.log({ isAuthenticated });
  return (
    <BaseLayout>
      <>
        <h1 className="w-400 h-screen"></h1>
      </>
    </BaseLayout>
  );
}
