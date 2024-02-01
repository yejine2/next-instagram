import React from "react";
import { CgClose } from "react-icons/cg";
import CloseIcon from "./ui/icons/CloseIcon";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function PostModal({ onClose, children }: Props) {
  return (
    <section
      className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-50 bg-neutral-900/70"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose(); // post 외부 클릭, 창 닫기, 자식 node가 아니라 외부 섹션 타겟
        }
      }}
    >
      <button
        className="fixed top-0 right-0 p-9 text-white"
        onClick={() => onClose()}
      >
        <CloseIcon />
      </button>
      <div className="bg-white w-4/5 h-3/5 max-w-7xl">{children}</div>
    </section>
  );
}
