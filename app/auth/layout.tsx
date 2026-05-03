"use client";

import Button from "@/Components/layout/Button";
import Image from "next/image";
import { ReactNode, useState } from "react";
import bg from "@/public/bgLogin.jpg";

export default function AuthLayout({
  children,
  login,
  signup,
}: {
  children: ReactNode;
  login: ReactNode;
  signup: ReactNode;
}) {
  const [newUser, setNewUser] = useState(false);

  return (
    <>
      <div className="h-svh flex items-center justify-center">
        <div className="Container__parallel">
          <div className="flex w-full justify-between">
            <Button
              text="ورود"
              style={
                newUser
                  ? "btn btn__login border0"
                  : "btn btn__login border0 active"
              }
              onClick={() => setNewUser(false)}
            />
            <Button
              text="ثبت نام"
              style={
                newUser
                  ? "btn btn__login border0 active"
                  : "btn btn__login border0"
              }
              onClick={() => setNewUser(true)}
            />
          </div>
          <div className="flex h-full">
            {newUser ? (
              <div className="w-full md:w-1/2 relative md:right-1/2">{signup}</div>
            ) : (
              <div className="w-full md:w-1/2 relative md:right-0">{login}</div>
            )}

            <Image
              src={bg}
              alt="backgraound"
              width={500}
              height={500}
              loading="eager"
              className={
                newUser
                  ? "hidden md:inline-block w-1/2 h-96 rounded relative -right-1/2 animation__toRight"
                  : "hidden md:block w-1/2 h-96 rounded relative right-0 animation__toLeft"
              }
            />
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
