"use client";

type Props = {
  label: string;
  onClick?: () => void;
  size: 1 | 2 | 3;
};

const sizes = {
  1: "px-3 py-1 text-sm",
  2: "px-4 py-2 text-base",
  3: "px-4 py-1 text-sm"
};

export const Button = ({ label, onClick, size }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white text-black border border-gray-300 rounded-full font-bold ${sizes[size]} hover:bg-gray-200 transition`}
    >
      {label}
    </button>
  );
};