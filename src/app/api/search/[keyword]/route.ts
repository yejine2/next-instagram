import { searchUsers } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { keyword: string };
};
// 사용하지 않는 인자는 대개 _ 언더바 형식으로 표현
export async function GET(_: NextRequest, context: Context) {
  return searchUsers(context.params.keyword) //
    .then((data) => NextResponse.json(data));
}
