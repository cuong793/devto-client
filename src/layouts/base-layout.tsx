"use client";
import Header from "./header/header";

type IProps = {
  children: React.ReactNode;
};

export default function BaseLayout({ children }: IProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
