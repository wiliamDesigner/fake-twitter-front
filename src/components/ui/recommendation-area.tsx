"use client";

import { useEffect, useState } from "react";

export const RecommendationArea = () => {

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {

    const loadUsers = async () => {

      // USER LOGADO
      const currentUser = JSON.parse(
        localStorage.getItem("user_data") || "{}"
      );

      const currentUserId = currentUser.id;

      // TODOS USUÁRIOS
      const usersRes = await fetch(
        "https://fake-twitter-back.onrender.com/api/users/"
      );

      const usersData = await usersRes.json();

      // QUEM EU SIGO
      const followingRes = await fetch(
        `https://fake-twitter-back.onrender.com/api/following/?user_id=${currentUserId}`
      );

      const followingData = await followingRes.json();

      const followingIds = followingData.map(
        (f: any) => f.id
      );

      // REMOVE:
      // EU MESMO
      // QUEM JÁ SIGO
      const filtered = usersData.filter(
        (user: any) =>
          user.id !== currentUserId &&
          !followingIds.includes(user.id)
      );

      setUsers(filtered);

    };

    loadUsers();

  }, []);

  // FOLLOW
  const handleFollow = async (id: number) => {

    // USER LOGADO
    const currentUser = JSON.parse(
      localStorage.getItem("user_data") || "{}"
    );

    const user_id = currentUser.id;

    try {

      await fetch(
        `https://fake-twitter-back.onrender.com/api/follow/${id}/`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            user_id
          })
        }
      );

      // REMOVE DA LISTA
      setUsers((prev) =>
        prev.filter((user) => user.id !== id)
      );

    } catch (err) {

      console.log(err);

      alert("Erro ao seguir usuário");

    }

  };

  return (

    <div className="bg-gray-700 rounded-3xl">

      <h2 className="text-xl p-6">
        Quem seguir
      </h2>

      <div className="flex flex-col gap-4 p-6 pt-0">

        {users.map((user) => (

          <div
            key={user.id}
            className="flex items-center justify-between"
          >

            <div className="flex flex-col">

              <div className="font-bold text-white">
                {user.username}
              </div>

              <div className="text-gray-400">
                @{user.username}
              </div>

            </div>

            <button
              onClick={() => handleFollow(user.id)}
              className="bg-white text-black px-4 py-1 rounded-full font-bold hover:opacity-80"
            >
              Seguir
            </button>

          </div>

        ))}

      </div>

    </div>

  );

};