import { SearchUser } from "@/model/user";
import { client } from "./sanity";

// user와 관련된 새니티 CRUD
type OAuthUser = {
  id: string;
  email?: string;
  name: string;
  username: string;
  image?: string | null;
};

// ANCHOR createIfNotExists 데이터 생성
export async function addUser({ id, username, name, email, image }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: "user", // 스키마 타입,
    username,
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

// ANCHOR fetch 데이터 가져오기
// username을 기반으로 User 정보 새니티에서 얻기 https://www.sanity.io/docs/query-cheat-sheet
export async function getUserByUsername(username: string) {
  return client.fetch(/* groq */ `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id":_id,
      following[]->{username,image},
      followers[]->{username,image},
      "bookmarks":bookmarks[]->_id
    }`);
}

export async function searchUsers(keyword?: string) {
  const query = keyword
    ? `&& (name match "${keyword}") || (username match "${keyword}")`
    : "";
  return client
    .fetch(
      `*[_type =="user" ${query}]{
      ...,
      "following": count(following),
      "followers": count(followers),
    }
    `
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0, // 기본 값 설정
        followers: user.followers ?? 0,
      }))
    );
}

export async function getUserForProfile(username: string) {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id":_id,
      "following": count(following),
      "followers": count(followers),
      "posts": count(*[_type=="post" && author->username == "${username}"])
    }
    `,
      undefined,
      {
        cache: "no-store",
      }
    )
    .then((user) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    }));
}

export async function addBookmark(userId: string, postId: string) {
  return client
    .patch(userId) //
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [
      {
        _ref: postId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}

// https://www.sanity.io/docs/js-client#multiple-mutations-in-a-transaction
export async function follow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, (user) =>
      user
        .setIfMissing({ following: [] })
        .append("following", [{ _ref: targetId, _type: "reference" }])
    )
    .patch(targetId, (user) =>
      user
        .setIfMissing({ followers: [] })
        .append("followers", [{ _ref: myId, _type: "reference" }])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId: string, targetId: string) {
  return client
    .transaction() //
    .patch(myId, (user) => user.unset([`following[_ref=="${targetId}"]`]))
    .patch(targetId, (user) => user.unset([`followers[_ref=="${myId}"]`]))
    .commit({ autoGenerateArrayKeys: true });
}
