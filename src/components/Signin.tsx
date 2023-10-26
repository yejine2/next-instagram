"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import ColorButton from "./ui/ColorButton";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

// custom sign in page
function Signin({ providers, callbackUrl }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <div key={name}>
          <ColorButton
            key={id}
            text={`Sign in with ${name}`}
            onClick={() => signIn(id, { callbackUrl })}
            size="big"
          />
        </div>
      ))}
    </>
  );
}

export default Signin;
