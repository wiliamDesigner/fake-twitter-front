"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  label: string;
  icon: IconDefinition;
  href: string;
  active?: boolean;
};

export const NavItem = ({ label, icon, href, active }: Props) => {
  const pathName = usePathname();
  const isMe = pathName.toLowerCase() === href.toLowerCase();

  return (
   <Link
  href={href}
  className={`flex items-center gap-6 py-3 px-4 rounded-full transition ${
    active || isMe
      ? "opacity-100 text-white font-bold"
      : "opacity-70 text-gray-400 hover:opacity-100 hover:text-white"
  }`}
>
      <FontAwesomeIcon icon={icon} className="size-6" />
      <div className="text-lg">{label}</div>
    </Link>
  );
};