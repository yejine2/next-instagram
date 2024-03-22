"use client";

import usePosts from "@/hooks/posts";
import { BeatLoader } from "react-spinners";
import PostListCard from "./PostListCard";

function PostList() {
  const { posts, isLoading } = usePosts();

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
