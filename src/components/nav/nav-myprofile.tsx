"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const NavMyprofile = () => {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user_data") || "null");
    setUser(u);
  }, []);

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <Link href={`/${user.slug || user.name}`}>
          <img
            src={user.avatar || "/emo.jpg"}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="text-white font-bold truncate">
          {user.name}
        </div>

        
        <div className="text-gray-500 text-sm truncate">
          @{user.slug || user.name}
        </div>

      </div>
    </div>
  );
};