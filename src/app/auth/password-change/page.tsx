'use client';
import { TextField } from "@/components/inputs/text-filed";
import { useAuthRequest } from "@/hooks/request";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/auth-provider";


const PasswordChange = () => {

  const {state} = useAuthContext()

  const searchParams = useSearchParams();

  const router = useRouter();

  const token = searchParams.get('token')

  const { changePassword } = useAuthRequest();

  const validationSchema = yup.object({
    newPassword: yup
      .string()
      .required()
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
        "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match"),
  });
  const resolver = yupResolver(validationSchema);
  const methods = useForm({
    resolver
  });
  const onSubmit = async (value: any) => {
    const data = {...value , token }
    try {
      await changePassword(data);
      toast.success("Change password successfully");
    } catch (e: any) {
      const error = await e;
      toast.error(
        error.message || "Error! An error occurred. Please try again later"
      );
    }
  };

  useEffect(()=>{
    if(state.isAuthenticated){
      router.push('/')
    }
  },[router, state.isAuthenticated])
  return (
    <div className="bg-gray-100 h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-center text-4xl font-bold py-8 ">Change Password</h1>
        <div className="w-full md:w-2/6 border bg-white p-8 rounded-xl shadow-md border-gray-300">
          <FormProvider {...methods}>
            <form
              className="w-full text-center space-y-4"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <TextField label="New password" name="newPassword" type="text" />
              <TextField label="Confirm password" name="confirmPassword" type="text" />
              <button
                className="w-full bg-indigo-600 text-white py-2 rounded-md"
                type="submit"
              >
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

export default PasswordChange;
