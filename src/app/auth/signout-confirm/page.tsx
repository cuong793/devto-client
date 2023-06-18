"use client";
import { useAuthContext } from "@/context/auth-provider";
import BaseLayout from "@/layouts/base-layout";
import { setUser } from "@/store/actions";
import { setAccessToken } from "@/utils/auth/access-token";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOut() {
  const { state, dispatch } = useAuthContext();
  const { isAuthenticated } = state;
  const router = useRouter();
  const signOut = () => {
    setAccessToken("");
    dispatch(
      setUser({
        isAuthenticated: false,
      })
    );
    router.push("/");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <BaseLayout>
      <div className="h-screen flex justify-center items-center ">
        <div className="text-center">
          <p className="text-2xl font-semibold mb-2">
            Are you sure you want to sign out?
          </p>
          <button
            onClick={() => {
              signOut();
            }}
            className="btn-primary"
          >
            Yes, sign out
          </button>
        </div>
      </div>
    </BaseLayout>
  );
}
