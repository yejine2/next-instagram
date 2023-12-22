"use client";

import { SimplePost } from "@/model/post";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import PostListCard from "./PostListCard";

function PostList() {
  const { data: posts, isLoading } = useSWR<SimplePost[]>("/api/posts");

  return (
    <section className="py-4">
      {isLoading && (
        <div className="text-center mt-32">
          <BeatLoader size={8} color="skyblue" />
        </div>
      )}
      {posts && (
        <ul className="flex flex-col gap-4">
          {posts &&
            posts.map((post, index) => (
              <li key={post.id}>
                <PostListCard post={post} priority={index < 2} />
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}

export default PostList;
