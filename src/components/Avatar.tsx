type AvatarSize = "small" | "medium" | "large";
type Props = {
  image?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
};

function Avatar({ image, size = "large", highlight = false }: Props) {
  //  image: 'https://lh3.googleusercontent.com/a/ACg8ocLKtre0JW04Xi8lSoO7dtwbIOayf7oF8nBwDAvV5XUzrY0=s96-c'
  // 외부 서버에서 가져오는 이미지는 호스트가 달라질 수 있으므로 기존 img 사용
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        referrerPolicy="no-referrer"
        className={`bg-white object-cover rounded-full ${getImageSizeStyle(
          size
        )}`}
        alt="user profile"
        src={image ?? undefined}
      />
    </div>
  );
}

export default Avatar;

// 조건부 스타일
function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const baseStyle = "rounded-full flex justify-center items-center";
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
    : "";
  const sizeStyle = getContainerSize(size);
  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}

function getContainerSize(size: AvatarSize): string {
  switch (size) {
    case "small":
      return "w-9 h-9";
    case "medium":
      return "w-11 h-11";
    case "large":
      return "w-[68px] h-[68px]";
  }
}

function getImageSizeStyle(size: AvatarSize): string {
  switch (size) {
    case "small":
      return "w-[34px] h-[34px] p-[0.1rem]";
    case "medium":
      return "w-[42px] h-[42px] p-[0.1rem]";
    case "large":
      return "w-16 h-16 p-[0.2rem]";
  }
}
