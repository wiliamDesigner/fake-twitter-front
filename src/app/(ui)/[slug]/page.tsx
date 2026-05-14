"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import { ProfileFeed } from "@/components/profile/profile.feed";
import { getUser } from "@/utils/getUser";

export default function Page() {

  const [user, setUser] = useState<any>(null);

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {

    const u = getUser();

    console.log("USER:", JSON.stringify(u, null, 2));

    if (u) {

      setUser(u);

      // BUSCA STATS REAIS
      fetch(
        `http://127.0.0.1:8000/api/users/${u.id}/stats/`
      )
        .then((res) => res.json())
        .then((data) => {

          console.log(data);

        setStats(data);

        });

    }

  }, []);

  if (!user) return null;

  return (
    <div>

      {/* CAPA */}
      <section className="border-b-2 border-gray-900">

        <div
          className="bg-gray-500 h-28 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url(${user.cover || "/emo.jpg"})`
          }}
        ></div>

      </section>

      {/* FOTO */}
      <div className="-mt-12 flex justify-between items-end px-6">

        <img
          src={user.avatar || "/emo.jpg"}
          alt={user.name}
          className="size-24 rounded-full object-cover"
        />

      </div>

      {/* INFO */}
      <div className="px-6 mt-4">

        <div className="text-xl font-bold">
          {user.name}
        </div>

        <div className="text-gray-500">
          @{user.slug}
        </div>

        <div className="py-5 text-lg text-gray-500">
          {user.bio}
        </div>

        {user.link && (
          <div className="flex gap-2 items-center">

            <FontAwesomeIcon
              icon={faLink}
              className="size-5"
            />

            <Link
              href={user.link}
              target="_blank"
              className="text-blue-300"
            >
              {user.link}
            </Link>

          </div>
        )}

        {/* FOLLOW STATS */}
        <div className="my-5 flex gap-6">

          <div className="text-xl text-gray-500">

            <span className="text-white">
              {stats?.following || 0}
            </span>

            {" "}Seguindo

          </div>

          <div className="text-xl text-gray-500">

            <span className="text-white">
              {stats?.followers || 0}
            </span>

            {" "}Seguidores

          </div>

        </div>

      </div>

      <ProfileFeed />

    </div>
  );
}