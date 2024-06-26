import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";
import Signin from "@/components/Signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin",
  description: "Signup or Login to Yestagram",
};

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

async function SigninPage({ searchParams: { callbackUrl } }: Props) {
  // 서버 컴포넌트
  const session = await getServerSession(authOptions);

  // 이미 로그인한 유저
  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? {}; // null일 수 있다고해서 기본값으로 빈 레코드 설정

  // 클라이언트 컴포넌트 만들어서 클라이언트 역할 함
  return (
    <section className="flex justify-center mt-24">
      <Signin providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </section>
  );
}

export default SigninPage;
