'use client';
import { TextField } from "@/components/inputs/text-filed";
import { useAuthContext } from "@/context/auth-provider";
import { useAuthRequest } from "@/hooks/request";
import { Spinner } from "@/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";


const ForgotPassword = () => {
  const { forgotPassword } = useAuthRequest();
  const { state } = useAuthContext();
  const { isAuthenticated } = state;
  const [loading , setLoading] = useState(false)
  const router = useRouter()
  const methods = useForm();
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await forgotPassword(data);
      toast.success("An email has been sent to you to reset your password");
      setLoading(false);
    } catch (e: any) {
      const error = await e;
      toast.error(
        error.message || "Error! An error occurred. Please try again later"
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="bg-gray-100 h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-center text-4xl font-bold py-8 ">Reset Password</h1>
        <div className="w-full md:w-2/6 border bg-white p-8 rounded-xl shadow-md border-gray-300">
          <FormProvider {...methods}>
            <form
              className="w-full text-center space-y-4"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <TextField label="Email address" name="email" type="email" />
              <button
                disabled={loading}
                className="flex justify-center items-center w-full bg-indigo-600 text-white py-2 rounded-md"
                type="submit"
              >
                {loading ? <div className="w-5 mr-2"><Spinner /></div> : ""}
                Send
              </button>
              <p>
                Have an account?
                <Link href="/auth/login" className="text-indigo-600">
                  Log in here.
                </Link>
              </p>
              <p>
                Don&apos;t have an account yet?
                <Link href="/auth/register" className="text-indigo-600">
                  Sign up here.
                </Link>
              </p>
            </form>
          </FormProvider>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ForgotPassword;
