"use client";

import { SearchUser } from "@/model/user";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import UserCard from "./UserCard";
import { BeatLoader } from "react-spinners";
import useDebounce from "@/hooks/debounce";

export default function UserSearch() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <section className="w-full max-w-2xl my-4 flex flex-col items-center px-3 md:px-0">
      <form className="w-full mb-4" onSubmit={onSubmit}>
        <input
          className="w-full p-2 outline-none border border-gray-300"
          type="text"
          autoFocus
          placeholder="Search for a username or name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {error && <p>무언가가 잘못 되었습니다. 😭</p>}
      {isLoading && <BeatLoader />}
      {!isLoading && !error && users?.length === 0 && (
        <p>찾는 사용자가 없습니다. 😭</p>
      )}
      <ul className="w-full py-4">
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
