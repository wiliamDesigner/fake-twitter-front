"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState } from "react";

type Props = {

  placeholder: string;

  value?: string;

  onChange?: (newValue: string) => void;

  filled?: boolean;

  isPassword?: boolean;

  icon?: IconDefinition;

  onEnter?: () => void;

};

export const Input = ({
  placeholder,
  value,
  onChange,
  filled,
  isPassword = false,
  icon,
  onEnter
}: Props) => {

  const [showPassword, setShowPassword] = useState(false);

  return (

    <div
      className={`
        flex
        items-center
        h-14
        rounded-3xl
        border-2
        border-gray-700
        focus-within:border-white
        px-4
        ${
          filled
            ? "bg-gray-700"
            : "bg-transparent"
        }
      `}
    >

      {/* ÍCONE */}
      {icon && (

        <FontAwesomeIcon
          icon={icon}
          className="
            mr-3
            size-5
            text-gray-400
          "
        />

      )}

      {/* INPUT */}
      <input
        type={
          isPassword && !showPassword
            ? "password"
            : "text"
        }
        className="
          flex-1
          outline-none
          bg-transparent
          text-white
        "
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          onChange &&
          onChange(e.target.value)
        }
        onKeyDown={(e) => {

          if (
            e.key === "Enter" &&
            onEnter
          ) {

            onEnter();

          }

        }}
      />

      {/* BOTÃO MOSTRAR SENHA */}
      {isPassword && (

        <button
          type="button"
          onClick={() =>
            setShowPassword(!showPassword)
          }
          className="
            text-sm
            text-gray-400
            hover:text-white
            transition
          "
        >

          {showPassword
            ? "Ocultar"
            : "Mostrar"}

        </button>

      )}

    </div>

  );

};