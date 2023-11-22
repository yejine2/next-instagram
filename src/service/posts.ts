import { SimplePost } from "@/model/post";
import { client, urlFor } from "./sanity";

// projection 하면서 필드 추가 하는 것
// post.author.username -> post.username 으로 간편하게 사용할 수 있게 풀어서
// author->username는, author에 있는 username을 "username" 키에 할당한다는 뜻
const simplePostProjection = `
...,
"username": author->username,
"userImage":  author->image,
"image": photo,
"likes": likes[]->username,
"text": comments[0].comment,
"comments": count(comments),
"id":_id,
"createdAt":_createdAt
`;

export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      /* groq */ `*[_type == "post" && author->username == "${username}"
  ||  author._ref in *[_type == "user" && username == "${username}"].following[]._ref] | order(_createdAt desc){
    ${simplePostProjection}
  }`
    )
    .then((posts) =>
      posts.map((post: SimplePost) => ({ ...post, image: urlFor(post.image) }))
    );
}
