"use client";
import { IRegister } from "@/interfaces/auth";
import { useAuthRequest } from "@/hooks/request";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";
import { TextField } from "@/components/inputs/text-filed";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "@/icons";
import { useAuthContext } from "@/context/auth-provider";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {state} = useAuthContext();
  const { register } = useAuthRequest();
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
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match"),
  });
  const resolver = yupResolver(validationSchema);
  const methods = useForm({
    resolver,
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await register(data);
      toast.success("Sign up success");
      router.push("/auth/login");
      setLoading(false);
    } catch (e: any) {
      const errors = await e;
      toast.error(
        errors?.message || "Error! An error occurred. Please try again later"
      );
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(state.isAuthenticated){
      router.push('/')
    }
  },[router, state.isAuthenticated])
  return (
    <section className="bg-gray-100 h-screen">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-4xl font-bold text-center py-6">
          Create and account
        </h1>
        <div className="space-y-6 w-full md:w-2/6 p-8 border shadow-md rounded-xl border-gray-300 bg-white">
          <FormProvider {...methods}>
            <form
              className="space-y-2 md:space-y-6"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <TextField label="Name" name="name" />
              <TextField label="Email address" name="email" />
              <TextField label="Password" name="password" />
              <div>
                <TextField label="Confirm Password" name="confirmPassword" />
              </div>
              <div>
                <button
                  disabled={loading}
                  type="submit"
                  className="flex justify-center items-center w-full bg-indigo-600 text-white py-2 rounded-md"
                >
                  {loading ? <Spinner /> : ""}
                  Create an account
                </button>
              </div>
              <div className="text-center text-indigo-600">
                <a href="/auth/login">Log in here</a>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
      <Toaster />
    </section>
  );
}
