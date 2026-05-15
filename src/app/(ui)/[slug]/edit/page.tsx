"use client";

import { useState, useEffect } from "react";
import { GeneralHeader } from "@/components/ui/general-header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");

  const [avatar, setAvatar] = useState("");
  const [cover, setCover] = useState("");

  // CARREGA USUÁRIO
  useEffect(() => {

    const data = localStorage.getItem("user_data");

    if (data) {

      const user = JSON.parse(data);

      setName(user.name || "");
      setBio(user.bio || "");
      setLink(user.link || "");

      setAvatar(user.avatar || "");
      setCover(user.cover || "");

    }

  }, []);

  // SALVAR PERFIL
  const handleSave = async () => {

    const current = JSON.parse(
      localStorage.getItem("user_data") || "{}"
    );

    const updatedUser = {
      ...current,
      name,
      bio,
      link,
      avatar,
      cover,
    };

    // SALVA NO FRONT
    localStorage.setItem(
      "user_data",
      JSON.stringify(updatedUser)
    );

    try {

      // ENVIA PRO BACKEND
      const response = await fetch(
        "https://fake-twitter-back.onrender.com/api/users/${u.id}/stats/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(updatedUser),
        }
      );

      const data = await response.json();

      console.log(data);

      alert("Perfil atualizado!");

    } catch (err) {

      console.log(err);

      alert("Erro ao salvar perfil");

    }

    router.push("/profile");
  };

  return (
    <div>

      <GeneralHeader backHref="/profile">
        <div className="font-bold text-lg">
          Editar perfil
        </div>
      </GeneralHeader>

      <div className="flex flex-col gap-4 p-4">

        {/* CAPA */}
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
                setCover(reader.result as string);
              };

              reader.readAsDataURL(file);

            }}
          />

          <div
            className="h-40 rounded-xl bg-cover bg-center bg-gray-700"
            style={{
              backgroundImage: `url(${cover || "/emo.jpg"})`
            }}
          ></div>

        </label>

        {/* AVATAR */}
        <label className="cursor-pointer -mt-14 ml-4 w-fit">

          <input
            type="file"
            accept="image/*"
            className="hidden"

            onChange={(e) => {

              const file = e.target.files?.[0];

              if (!file) return;

              const reader = new FileReader();

              reader.onload = () => {
                setAvatar(reader.result as string);
              };

              reader.readAsDataURL(file);

            }}
          />

          <img
            src={avatar || "/emo.jpg"}
            alt="avatar"
            className="size-24 rounded-full border-4 border-black object-cover"
          />

        </label>

        {/* NOME */}
        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent border border-gray-700 rounded-xl p-3"
        />

        {/* BIO */}
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="bg-transparent border border-gray-700 rounded-xl p-3 h-32 resize-none"
        />

        {/* LINK */}
        <input
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="bg-transparent border border-gray-700 rounded-xl p-3"
        />

        {/* BOTÃO */}
        <Button
          label="Salvar"
          size={2}
          onClick={handleSave}
        />

      </div>

    </div>
  );
}