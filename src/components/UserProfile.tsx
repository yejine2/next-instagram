import { SearchUser } from "@/model/user";

type Props = {
  user: SearchUser;
};
export default function UserProfile({ user }: Props) {
  return <p>{user.username}</p>;
}
