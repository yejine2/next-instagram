import NextAuth, { DefaultSession } from "next-auth/next";

// 기존 next-auth의 타입 중 interface Session에 user의 username라는 임의의 type 추가
// DefaultSession["user"] 타입 그대로 가져오고 거기에 username type 추가
declare module "next-auth" {
  interface Session {
    user: {
      username: string;
    } & DefaultSession["user"];
  }
}
