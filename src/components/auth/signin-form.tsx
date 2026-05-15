"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { Input } from "../ui/input";

import { Button } from "../ui/button";

export const SignInForm = () => {

  const router = useRouter();

  const [usernameField, setUsernameField] = useState("");

  const [passwordField, setPasswordField] = useState("");

  const handleEnterButton = async () => {

    // VALIDAÇÃO
    if (!usernameField || !passwordField) {

      alert("Preencha todos os campos");

      return;

    }

    try {

      // LOGIN BACKEND
      const res = await fetch(
        "http://127.0.0.1:8000/api/login/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username: usernameField,
            password: passwordField,
          }),
        }
      );

      const data = await res.json();

      // ERRO LOGIN
      if (!res.ok) {

        alert(
          data.error ||
          "Usuário ou senha inválidos"
        );

        return;

      }

      // SALVA USER
      localStorage.setItem(
        "user_data",

        JSON.stringify({
          id: data.user_id,
          name: usernameField,
          slug: usernameField,

          bio: "",
          link: "",

          avatar: "",
          cover: "",
        })
      );

      // REDIRECIONA
      router.replace("/home");

    } catch (err) {

      console.error(err);

      alert("Erro no login");

    }

  };

  return (

    <div className="flex flex-col gap-4">

        {/* USERNAME */}
    <Input
      placeholder="Digite seu usuário"
      value={usernameField}
      onChange={(t) =>
        setUsernameField(t)
      }
    />

          {/* PASSWORD */}
    <Input
      isPassword
      placeholder="Digite sua senha"
      value={passwordField}
      onChange={(t) =>
        setPasswordField(t)
      }
    />
      {/* BOTÃO */}
      <Button
        label="Entrar"
        onClick={handleEnterButton}
        size={1}
      />

    </div>

  );

};