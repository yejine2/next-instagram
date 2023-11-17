import { User } from "@/model/user";
import Avatar from "./Avatar";

type Props = {
  user: User;
};

function SideBar({ user: { name, username, email, image } }: Props) {
  return (
    <>
      <div className="flex items-center">
        {image && <Avatar image={image} />}
        <div className="ml-4">
          <p className="text-bold">{username}</p>
          <p className="text-lg text-neutral-500 leading-4">{name}</p>
        </div>
      </div>
      <p className="text-sm text-neutral-500 mt-8">
        About · Help · press · API · Jobs · Privacy · Terms · Location ·
        Language
      </p>
      <p className="font-bold text-sm mt-8 text-neutral-500">
        @Copyright INSTAGRAMI
      </p>
    </>
  );
}

export default SideBar;
