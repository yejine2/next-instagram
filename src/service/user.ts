import { client } from "./sanity";
// user와 관련된 새니티 CRUD

type OAuthUser = {
  id: string;
  email?: string;
  name: string;
  username: string;
  image?: string | null;
};
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
