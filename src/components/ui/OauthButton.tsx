import { GoogleIcon } from "./icons";

type Props = {
  provider: string;
  onClick: () => void;
};
export default function OauthButton({ provider, onClick }: Props) {
  return (
    <button
      className="border border-gray-300 gap-4 px-6 py-2 rounded-md bg-white flex justify-center items-center w-full"
      onClick={onClick}
    >
      {provider === "Google" && <GoogleIcon />}
      <p className="text-sm font-medium">{`Sign in with ${provider}`}</p>
    </button>
  );
}
