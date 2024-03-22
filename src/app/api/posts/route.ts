import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getFollowingPostsOf } from "@/service/posts";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 }); // 401: Unauthorized error
  }
  return getFollowingPostsOf(user.username).then((data) =>
    NextResponse.json(data)
  );
}
