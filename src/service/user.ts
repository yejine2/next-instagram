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
  return client.fetch(
    `*[_type =="user" ${query}]{
      ...,
      "following": count(following),
      "followers": count(followers),
    }
    `
  );
}
