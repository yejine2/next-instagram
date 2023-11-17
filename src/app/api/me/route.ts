import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getUserByUsername } from "@/service/user";

// 로직을 한 곳에 다 정리하지마라.
// Route요청은 이 메서드 즉 GET요청에 대한 유효한 인자들이 다 전달되었는지 확인한 다음 요청은 전가하고 모듈별, 책임별, 함수별로 쪼개어서 작성하는 것이 좋음
export async function GET() {
  // 1. 클라이언트가 request로 요청한 헤더의 쿠키에 있는 jwt정보를 근거로해서, 사용자가 누구인지 파악
  // 2. next.auth가 알아서 해줌 - getServerSession() 사용하면 됨
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 }); // 401: Unauthorized error
  }
  return getUserByUsername(user.username).then((data) =>
    NextResponse.json(data)
  );
}
