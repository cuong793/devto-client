"use client";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useAuthRequest } from "@/hooks/request";
import { TextField } from "@/components/inputs/text-filed";
import { setAccessToken } from "@/utils/auth/access-token";
import { useAuthContext } from "@/context/auth-provider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EyeFill, EyeOffFill, IconGoogle, IconTwitter, Spinner } from "@/icons";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthRequest();
  const { state, initialize } = useAuthContext();
  const { isAuthenticated } = state;
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Entered value does not match email format")
      .required(),
    password: yup
      .string()
      .required()
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
        "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
      ),
  });
  const resolver = yupResolver(validationSchema);
  const methods = useForm({
    resolver,
  });

  const onSubmit = async (payload: any) => {
    setLoading(true);
    try {
      const { data } = await login(payload);
      setAccessToken(data.access_token);
      toast.success("Logged in successfully");
      await initialize();
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
    <section className="bg-gray-100 h-screen">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-center py-8">
          Sign in to your account
        </h1>
        <div className="w-full md:w-2/6 border p-8 shadow-md rounded-xl border-gray-300 bg-white space-y-6">
          <FormProvider {...methods}>
            <form
              className="space-y-6"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <TextField label="Email address" name="email" />
              <div className="relative !mb-3">
                <TextField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                />
                <div
                  className="absolute right-2 top-[calc(50%_-_8px)]"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <EyeFill /> : <EyeOffFill />}
                </div>
              </div>
              <Link className="text-indigo-600" href="/auth/forgot-password">
                Forgot your password?
              </Link>
              <button
                disabled={loading}
                type="submit"
                className="flex justify-center items-center w-full bg-indigo-600 text-white py-2 rounded-md"
              >
                {loading ? (
                  <div className="w-5 mr-2">
                    <Spinner />
                  </div>
                ) : (
                  ""
                )}
                Sign in
              </button>
              <div className="text-center">
                <Link href="/auth/register" className="text-indigo-600">
                  Create new account
                </Link>
              </div>
            </form>
          </FormProvider>
          <hr />
          <button className="w-full rounded-md border py-2 flex justify-center items-center">
            <IconGoogle />
            <p className="ml-2">Log in / sign up with google</p>
          </button>
          <button className="w-full rounded-md border py-2 flex justify-center items-center">
            <IconTwitter />
            <p className="ml-2">Log in / sign up with twitter</p>
          </button>
        </div>
      </div>
      <Toaster />
    </section>
  );
}
