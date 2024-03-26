import { getPost } from "@/service/posts";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { withSessionUser } from "@/util/session";

type Context = {
  params: { id: string };
};

export async function GET(_: NextRequest, context: Context) {
  return withSessionUser(async () =>
    getPost(context.params.id) //
      .then((data) => NextResponse.json(data))
  );
}
