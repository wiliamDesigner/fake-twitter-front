"use client";

import { faImage } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useRef, useEffect, useState } from "react";

export const TweetPost = () => {

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [user, setUser] = useState<any>(null);

  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {

    const u = JSON.parse(
      localStorage.getItem("user_data") || "null"
    );

    setUser(u);

  }, []);

  const handleInput = () => {

    const el = textareaRef.current;

    if (!el) return;

    el.style.height = "auto";

    el.style.height = el.scrollHeight + "px";

  };

  const handlePost = async () => {

    console.log("CLICOU NO BOTÃO");

    const content = textareaRef.current?.value?.trim();

    const currentUser = JSON.parse(
      localStorage.getItem("user_data") || "{}"
    );

    const user_id = currentUser.id;

    if (!content && !image) {

      alert("Escreve algo ou escolha uma imagem 😅");

      return;

    }

    if (!user_id) {

      alert("Você precisa estar logado");

      return;

    }

    try {

      const formData = new FormData();

      formData.append("user_id", user_id);

      formData.append("content", content || "");

      if (image) {

        formData.append("image", image);

      }

      const res = await fetch(
        "https://fake-twitter-back.onrender.com/api/tweets/create/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {

        const text = await res.text();

        console.error("ERRO DO BACK:", text);

        alert("Erro ao postar");

        return;

      }

      const data = await res.json();

      console.log("RESPOSTA:", data);

      if (textareaRef.current) {

        textareaRef.current.value = "";

      }

      setImage(null);

      window.location.reload();

    } catch (err) {

      console.error("Erro ao postar:", err);

      alert("Erro ao postar");

    }

  };

  if (!user) return null;

  return (

    <div className="flex w-full gap-6 px-6 py-4 border-b border-gray-800 relative z-50">

      {/* AVATAR */}
      <div>

        <img
          src={user.avatar || "/emo.jpg"}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover"
        />

      </div>

      {/* ÁREA TWEET */}
      <div className="flex-1 min-w-0">

        <textarea
          ref={textareaRef}
          onInput={handleInput}
          rows={3}
          maxLength={170}
          className="
            w-full
            resize-none
            outline-none
            text-lg
            text-white
            bg-transparent
            overflow-hidden
          "
          placeholder="O que está acontecendo?"
        />

        {/* PREVIEW IMAGEM */}
        {image && (

          <img
            src={URL.createObjectURL(image)}
            alt=""
            className="
              mt-4
              rounded-2xl
              max-h-96
              object-cover
              border
              border-gray-700
            "
          />

        )}

        <div className="flex items-center justify-end gap-4 mt-3">

          {/* INPUT IMAGEM */}
          <label className="cursor-pointer">

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {

                const file = e.target.files?.[0];

                if (file) {

                  setImage(file);

                }

              }}
            />

            <FontAwesomeIcon
              icon={faImage}
              className="size-5 text-blue-500"
            />

          </label>

          <button
            onClick={handlePost}
            className="
              bg-white
              text-black
              px-4
              py-2
              rounded-full
              font-bold
              cursor-pointer
              hover:opacity-80
            "
          >
            Postar
          </button>

        </div>

      </div>

    </div>

  );

};