"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import ColorButton from "./ui/ColorButton";
import OauthButton from "./ui/OauthButton";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

// custom sign in page
function Signin({ providers, callbackUrl }: Props) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold tracking-tight text-2xl">
        Create an account
      </h1>
      <p className="text-sm text-gray-400 mt-1">
        Enter your email below to create your account
      </p>
      {Object.values(providers).map(({ name, id }) => (
        <div key={name} className="flex flex-col gap-4 w-full m-6">
          <OauthButton
            key={id}
            provider={name}
            onClick={() => signIn(id, { callbackUrl })}
          />
        </div>
      ))}
    </div>
  );
}

export default Signin;
