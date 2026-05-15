"use client";

import { useState } from "react";

export default function Page() {

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleReset = async () => {

    try {

      const res = await fetch(
        "https://fake-twitter-back.onrender.com/api/reset-password/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {

        alert(data.error);

        return;

      }

      alert("Senha alterada com sucesso");

    } catch (err) {

      console.log(err);

      alert("Erro no servidor");

    }

  };

  return (

    <div className="max-w-lg mx-auto mt-12 px-6">

      <h1 className="mt-10 text-2xl text-white text-center">

        Resetar senha

      </h1>

      <div className="mt-10 flex flex-col gap-6">

        {/* NOME */}
        <input
          type="text"
          placeholder="Digite seu nome"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="
            h-14
            rounded-3xl
            border-2
            border-gray-700
            bg-transparent
            px-4
            text-white
            outline-none
          "
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            h-14
            rounded-3xl
            border-2
            border-gray-700
            bg-transparent
            px-4
            text-white
            outline-none
          "
        />

        {/* SENHA */}
        <input
          type="password"
          placeholder="Digite sua nova senha"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
            h-14
            rounded-3xl
            border-2
            border-gray-700
            bg-transparent
            px-4
            text-white
            outline-none
          "
        />

        {/* BOTÃO RESET */}
        <button
          onClick={handleReset}
          className="
            h-12
            rounded-3xl
            bg-white
            text-black
            font-bold
          "
        >

          Resetar senha

        </button>

        {/* BOTÃO LOGIN */}
        <button
          onClick={() =>
            window.location.href = "/signin"
          }
          className="
            h-12
            rounded-3xl
            border-2
            border-gray-700
            text-white
            font-bold
            flex
            items-center
            justify-center
            hover:bg-gray-800
            transition
          "
        >

          Ir para login

        </button>

      </div>

    </div>

  );

}