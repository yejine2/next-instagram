import React from "react";
import Avatar from "./Avatar";

type Props = {
  image: string;
  username: string;
};

export default function PostUserAvatar({ image, username }: Props) {
  return (
    <div className="flex items-center gap-2 mb-2 p-3">
      <Avatar image={image} highlight size="medium" />
      <span className="text-gray-900 font-bold ml-1">{username}</span>
    </div>
  );
}
