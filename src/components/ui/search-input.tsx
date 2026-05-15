"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

type Props = {

  hideOnSearch?: boolean;

  defaultValue?: string;

};

export const SearchInput = ({
  hideOnSearch,
  defaultValue = ""
}: Props) => {

  const [value, setValue] = useState(defaultValue);

  const router = useRouter();

  const handleSearch = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {

    if (e.key !== "Enter") return;

    if (!value.trim()) return;

    try {

      const res = await fetch(
        `http://127.0.0.1:8000/api/users/${value}/`
      );

      if (res.status === 404) {

        alert("❌ Este usuário não existe");

        return;

      }

      router.push(`/${value}`);

    } catch (err) {

      console.error(err);

      alert("Erro ao buscar usuário");

    }

  };

  return (

    <input
      type="text"
      placeholder="Buscar"
      value={value}
      onChange={(e) =>
        setValue(e.target.value)
      }
      onKeyDown={handleSearch}
      className="
        flex-1
        outline-none
        bg-transparent
        text-white
        w-full
        px-4
        py-2
        rounded-full
        bg-gray-700
      "
    />

  );

};