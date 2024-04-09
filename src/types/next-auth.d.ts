import { AuthUser } from "@/model/user";

// 기존 next-auth의 타입 중 interface Session에 user의 username라는 임의의 type 추가
// DefaultSession["user"] 타입 + username type 추가
declare module "next-auth" {
  interface Session {
    // user: {
    //   username: string;
    // } & DefaultSession["user"];
    user: AuthUser; // 직접 정의한 타입으로 재정의
  }
}
