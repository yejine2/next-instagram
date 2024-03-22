import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import { parseDate } from "@/util/date";
import { Children, useState } from "react";

import HeartFillIcon from "./ui/icons/HeartFillIcon";
import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";
import ToggleButton from "./ui/ToggleButton";
import { SimplePost } from "@/model/post";
import { useSession } from "next-auth/react";
import { useSWRConfig } from "swr";
import usePosts from "@/hooks/posts";
import useMe from "@/hooks/me";
type Props = {
  post: SimplePost;
  children?: React.ReactNode;
};
export default function ActionBar({ post, children }: Props) {
  const { id, likes, createdAt } = post;
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(id) ?? false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };

  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };

  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        {/* 추가로 필요한 것이 있다면 자식 노드로 전달하게 수정 */}
        {children}
        <p className="text-xs text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
