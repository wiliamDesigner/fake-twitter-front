"use client";

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export const NavLogout = () => {
  const router = useRouter();

  const handleClick = () => {
    router.replace("/signin");
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex items-center gap-6 py-3 opacity-50 px-4 rounded-full transition hover:opacity-100 hover:text-white-500"
    >
      <FontAwesomeIcon icon={faArrowRightFromBracket} className="size-6" />
      <div className="text-lg">sair</div>
    </div>
  );
};