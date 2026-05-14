// Quando precisar mudar o meio da pagina

import { HomeHeader } from "@/components/home/home-header";
import { NavItem } from "@/components/nav/nav-item";
import { NavLogout } from "@/components/nav/nav-logout";
import { NavMyprofile } from "@/components/nav/nav-myprofile";
import { Logo } from "@/components/ui/logo";
import { RecommendationArea } from "@/components/ui/recommendation-area";
import { SearchInput } from "@/components/ui/search-input";
import { TrendingArea } from "@/components/ui/trending-area";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <main className="min-h-screen flex justify-center">

     
      <section className="hidden lg:flex flex-col sticky top-0 h-screen w-64 px-3 border-r border-gray-900">
        <div className="flex-1 mt-6">
          <Logo size={24} />

          <nav className="mt-11">
            <NavItem
              href="/home"
              icon={faHouse}
              label="Página inicial"
            />

            <div className="mb-6 flex flex-col gap-4"></div>

            <NavItem
              href="/profile"
              icon={faUser}
              label="Meu perfil"
            />
          </nav>
        </div>

        <div>
          <NavLogout />
          <NavMyprofile />
        </div>
      </section>

   
      <section className="w-full max-w-[600px] border-x border-gray-800">
        <HomeHeader />
        {children}
      </section>

      
      <aside className="hidden lg:flex flex-col gap-6 sticky top-0 h-fit w-[350px] px-6 py-6 border-l border-gray-900">
        <SearchInput hideOnSearch />
        <TrendingArea />
        <RecommendationArea />
      </aside>

    </main>
  );
}