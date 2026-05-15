"use client";

import { useEffect, useState } from "react";
import { GeneralHeader } from "@/components/ui/general-header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { ProfileFeed } from "@/components/profile/profile.feed";
import { getUser } from "@/utils/getUser";

export default function Page() {

  const isMe = true;

  const [user, setUser] = useState<any>(null);

  // STATS
  const [stats, setStats] = useState<any>(null);

  // USUÁRIOS QUE SEGUE
  const [following, setFollowing] = useState<any[]>([]);

  // SEGUIDORES
  const [followers, setFollowers] = useState<any[]>([]);

  useEffect(() => {

    const u = getUser();

    if (u) {

      setUser(u);

      // BUSCA STATS
      fetch(
        `https://fake-twitter-back.onrender.com/api/users/${u.id}/stats/`
      )
        .then((res) => res.json())
        .then((data) => {

          setStats(data);

          loadFollowing(u.id);

          loadFollowers(u.id);

        });

    }

  }, []);

  // CARREGA QUEM O USUÁRIO SEGUE
  const loadFollowing = async (userId: number) => {

    try {

      const response = await fetch(
        `https://fake-twitter-back.onrender.com/api/users/${userId}/following/`
      );

      const data = await response.json();

      console.log("FOLLOWING:", data);

      setFollowing(data);

    } catch (err) {

      console.log(err);

    }

  };

  // CARREGA SEGUIDORES
  const loadFollowers = async (userId: number) => {

    try {

      const response = await fetch(
        `https://fake-twitter-back.onrender.com/api/users/${userId}/followers/`
      );

      const data = await response.json();

      console.log("FOLLOWERS:", data);

      setFollowers(data);

    } catch (err) {

      console.log(err);

    }

  };

  // evita erro enquanto carrega
  if (!user) return null;

  return (

    <div>

      <GeneralHeader backHref="/home">

        <div className="font-bold text-lg">
          {user.name}
        </div>

        <div className="text-xs text-gray-500">
          {user.postCount || 0} posts
        </div>

      </GeneralHeader>

      {/* CAPA */}
      <section className="border-b-2 border-gray-900">

        <label className="cursor-pointer block">

          <input
            type="file"
            accept="image/*"
            className="hidden"

            onChange={(e) => {

              const file = e.target.files?.[0];

              if (!file) return;

              const reader = new FileReader();

              reader.onloadend = () => {

                const updatedUser = {
                  ...user,
                  cover: reader.result
                };

                localStorage.setItem(
                  "user_data",
                  JSON.stringify(updatedUser)
                );

                setUser(updatedUser);

              };

              reader.readAsDataURL(file);

            }}
          />

          <div
            className="bg-gray-500 h-28 bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url(${user.cover || "/emo.jpg"})`
            }}
          ></div>

        </label>

      </section>

      {/* FOTO + BOTÃO */}
      <div className="-mt-12 flex justify-between items-end px-6">

        {/* FOTO */}
        <label className="cursor-pointer">

          <input
            type="file"
            accept="image/*"
            className="hidden"

            onChange={(e) => {

              const file = e.target.files?.[0];

              if (!file) return;

              const reader = new FileReader();

              reader.onload = () => {

                const updatedUser = {
                  ...user,
                  avatar: reader.result
                };

                localStorage.setItem(
                  "user_data",
                  JSON.stringify(updatedUser)
                );

                setUser(updatedUser);

              };

              reader.readAsDataURL(file);

            }}
          />

          <img
            src={user.avatar || "/emo.jpg"}
            alt={user.name}
            className="size-24 rounded-full object-cover border-4 border-black"
          />

        </label>

        {/* BOTÃO */}
        <div className="w-32">

          {isMe && (

            <Link href={`/${user.slug}/edit`}>

              <Button
                label="Editar Perfil"
                size={2}
              />

            </Link>

          )}

        </div>

      </div>

      {/* INFO */}
      <div className="px-6 mt-4">

        <div className="text-xl font-bold">
          {user.name}
        </div>

        {user.slug && user.slug.trim() !== "" && (

          <div className="text-gray-500">
            @{user.slug}
          </div>

        )}

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

        {/* STATS */}
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

      {/* FEED */}
      <ProfileFeed />

      {/* SEGUINDO */}
      <div className="text-xl p-6 font-bold">

        Seguindo

      </div>

      <div className="px-6 pb-10">

        <div className="grid grid-cols-3 gap-4">

          {following.map((item: any) => (

            <div
              key={item.id}
              className="
                bg-[#16181C]
                rounded-2xl
                p-4
                flex
                flex-col
                items-center
                hover:bg-[#1D1F23]
                transition
                cursor-pointer
              "
            >

              {/* AVATAR */}
              <img
                src={
                  item.avatar
                    ? `https://fake-twitter-back.onrender.com${item.avatar}`
                    : "/emo.jpg"
                }
                alt=""
                className="
                  w-16
                  h-16
                  rounded-full
                  object-cover
                  border-2
                  border-gray-700
                "
              />

              {/* USERNAME */}
              <div className="text-white font-bold mt-3">
                {item.username}
              </div>

              {/* SLUG */}
              <div className="text-gray-400 text-sm">
                @{item.username}
              </div>

            </div>

          ))}

        </div>

      </div>

      {/* SEGUIDORES */}
      <div className="text-xl p-6 font-bold">

        Seguidores

      </div>

      <div className="px-6 pb-10">

        <div className="grid grid-cols-3 gap-4">

          {followers.map((item: any) => (

            <div
              key={item.id}
              className="
                bg-[#16181C]
                rounded-2xl
                p-4
                flex
                flex-col
                items-center
                hover:bg-[#1D1F23]
                transition
                cursor-pointer
              "
            >

              {/* AVATAR */}
              <img
                src={
                  item.avatar
                    ? `https://fake-twitter-back.onrender.com${item.avatar}`
                    : "/emo.jpg"
                }
                alt=""
                className="
                  w-16
                  h-16
                  rounded-full
                  object-cover
                  border-2
                  border-gray-700
                "
              />

              {/* USERNAME */}
              <div className="text-white font-bold mt-3">
                {item.username}
              </div>

              {/* SLUG */}
              <div className="text-gray-400 text-sm">
                @{item.username}
              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}