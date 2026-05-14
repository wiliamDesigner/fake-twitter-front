
//pagina quando clicka no perfil de alguem ou seja meu perfil

"use client";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "../ui/logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HomeMenu } from "./home-menu";
import { useState } from "react";

export const HomeHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="flex items-center justify-between p-6 border-b border-gray-800">
      
      <div className="w-full px-16">
      
        <div className="lg:hidden">
          <Logo size={24} />
        </div>

       
        <div className="hidden lg:block text-2xl font-bold">
          Página Inicial 
        </div>
      </div>

  
      <div
        className="cursor-pointer lg:hidden"
        onClick={() => setShowMenu(!showMenu)}
      >
        <FontAwesomeIcon icon={faBars} className="size-6" />
      </div>

      {showMenu && (
        <HomeMenu closeAction={() => setShowMenu(false)} />
      )}
    </header>
  );
};