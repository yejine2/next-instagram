"use client";
import { DetailUser } from "@/model/user";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import Avatar from "./Avatar";

// 1. 클라이언트 컴포넌트에서 백엔드에게 api/me로 요청 - 사용자의 정보 얻기
// 1-2. 유저 정보를 백엔드에 보낼 필요는 없다. 로그인 하면 브라우저 자체적으로 요청하고 서버에게서부터 응답헤더에 로그인 토큰에 쿠키받음,
// 1-3. 로그인 성립한번 하기만 하면 헤더에 토큰이 함께 붙어서 가서, 백엔드는 헤더의 토큰 정보로 유저 정보를 알수있다.
// 2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서
// 3. 백엔드에서 사용자의 상세 정보를 Sanity에서 가지고 옴(followings)
// 4. 여기에서, 클라이언트 컴포넌트에서 followings의 정보를 UI에 보여줌 (image, usename)

function FollowingBar() {
  const { data, isLoading, error } = useSWR<DetailUser>("/api/me");
  const users = data?.following;

  return (
    <section>
      {isLoading ? (
        <BeatLoader size={8} color="gray" />
      ) : (
        !users || (users.length === 0 && <p>{`팔로잉하는 유저가 없습니다.`}</p>)
      )}
      {users && users.length > 0 && (
        <ul>
          {users.map(({ image, username }) => (
            <li key={username}>
              <Link href={`/user/${username}`}>
                <Avatar image={image} highlight />
                <p>{username}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default FollowingBar;
