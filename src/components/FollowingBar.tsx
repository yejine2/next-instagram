"use client";
import { DetailUser } from "@/model/user";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import Avatar from "./Avatar";
import ScrollableBar from "./ui/ScrollableBar";

// 1. 클라이언트 컴포넌트에서 백엔드에게 api/me로 요청 - 사용자의 정보 얻기
// 1-2. 유저 정보를 백엔드에 보낼 필요는 없다. 로그인 하면 브라우저 자체적으로 요청하고 서버에게서부터 응답헤더에 로그인 토큰에 쿠키받음,
// 1-3. 로그인 성립한번 하기만 하면 헤더에 토큰이 함께 붙어서 가서, 백엔드는 헤더의 토큰 정보로 유저 정보를 알수있다.
// 2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서
// 3. 백엔드에서 사용자의 상세 정보를 Sanity에서 가지고 옴(followings)
// 4. 여기에서, 클라이언트 컴포넌트에서 followings의 정보를 UI에 보여줌 (image, usename)

function FollowingBar() {
  const { data, isLoading, error } = useSWR<DetailUser>("/api/me");
  const users = data?.following && [
    ...data?.following,
    ...data?.following,
    ...data?.following,
    ...data?.following,
    ...data?.following,
  ];

  return (
    <section className="w-full flex justify-center items-center p-4 bg-white rounded-lg shadow-sm min-h-[90px] shadow-neutral-300 overflow-x-auto relative z-0">
      {isLoading ? (
        <BeatLoader size={8} color="gray" />
      ) : (
        (!users || users.length === 0) && (
          <p className="text-gray-400 text-sm">{`관심있는 사람을 팔로잉 해보세요`}</p>
        )
      )}

      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ image, username }) => (
            <Link
              key={username}
              className="flex flex-col items-center w-20"
              href={`/user/${username}`}
            >
              <Avatar image={image} highlight />
              <p className="w-full text-sm text-center text-ellipsis overflow-hidden">
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}

export default FollowingBar;
