"use client";

import { useState } from "react";
import { GeneralHeader } from "@/components/ui/general-header";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");

  const handleSave = async () => {
   
  };

  return (
    <div>
      <GeneralHeader backHref="/Home">
        <div className="font-bold text-lg">Editar perfil</div>
      </GeneralHeader>

      <div className="p-4 flex flex-col gap-4">
        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <input
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <Button label="Salvar" onClick={handleSave} size={2} />
      </div>
    </div>
  );
}