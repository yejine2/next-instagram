import React from "react";

type Props = {
  image?: string | null;
  size?: "small" | "normal";
  highlight?: boolean;
};

function Avatar({ image, size = "normal", highlight = false }: Props) {
  //  image: 'https://lh3.googleusercontent.com/a/ACg8ocLKtre0JW04Xi8lSoO7dtwbIOayf7oF8nBwDAvV5XUzrY0=s96-c'
  // 외부 서버에서 가져오는 이미지는 호스트가 달라질 수 있으므로 기존 img 사용
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        referrerPolicy="no-referrer"
        className="rounded-full p-[0.1rem] w-full h-full"
        alt="user profile"
        src={image ?? undefined}
      />
    </div>
  );
}

export default Avatar;

function getContainerStyle(size: string, highlight: boolean): string {
  // w-9 h-9 rounded-full bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300
  const baseStyle = "rounded-full";
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
    : "";
  const sizeStyle = size === "small" ? "w-9 h-9" : "w-[68px] h-[68px]";

  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}
