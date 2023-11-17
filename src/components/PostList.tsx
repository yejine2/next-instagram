"use client";

import { SimplePost } from "@/model/post";
import useSWR from "swr";

function PostList() {
  const { data: posts, isLoading } = useSWR<SimplePost[]>("/api/posts");

  return (
    <ul>{posts && posts.map((post) => <li key={post.id}>{post.text}</li>)}</ul>
  );
}

export default PostList;
