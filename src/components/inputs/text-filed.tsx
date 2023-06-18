import { InputHTMLAttributes } from "react";
import {
  Controller,
  FieldValues,
  useForm,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";

interface IProps {
  label: string;
  name: string;
}
export const TextField = ({
  label,
  name,
  ...props
}: IProps & InputHTMLAttributes<HTMLInputElement>) => {
  const { control } = useFormContext(); // retrieve all hook methods
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <input
            {...field}
            value={
              typeof field.value === "number" && field.value === 0
                ? ""
                : field.value || ""
            }
            placeholder={label}
            className="rounded-md w-full m-0 border block border-gray-300 px-3 py-2 text-gray-900  focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            {...props}
          />
          <p className="text-red-500">{error && error.message}</p>
        </>
      )}
    />
  );
};
