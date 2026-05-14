"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const SignUpForm = () => {

  const router = useRouter();

  const [nameField, setNameField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  const handleEnterButton = async () => {

    try {

      const res = await fetch(
        "http://127.0.0.1:8000/api/users/create/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username: nameField,
            email: emailField,
            password: passwordField,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {

        alert(data.error);
        return;

      }

      // 🔥 SALVA NOVO USUÁRIO
      localStorage.setItem(
        "user_data",

        JSON.stringify({
          id: data.id,
          name: data.username,
          slug: data.username,

          bio: "",
          link: "",

          avatar: "",
          cover: "",
        })
      );

      // ENTRA DIRETO
      router.replace("/home");

    } catch (err) {

      console.error(err);

      alert("Erro ao criar conta");

    }

  };

  return (

    <div className="flex flex-col gap-4">

      <Input
        placeholder="Digite seu nome"
        value={nameField}
        onChange={(t) => setNameField(t)}
      />

      <Input
        placeholder="Digite seu e-mail"
        value={emailField}
        onChange={(t) => setEmailField(t)}
      />

      <Input
        type="password"
        placeholder="Digite sua senha"
        value={passwordField}
        onChange={(t) => setPasswordField(t)}
      />

      <Button
        label="Criar conta"
        onClick={handleEnterButton}
        size={1}
      />

    </div>

  );

};