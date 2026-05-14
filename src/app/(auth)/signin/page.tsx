import { SignInForm } from "@/components/auth/signin-form";

import { Logo } from "@/components/ui/logo";

import Link from "next/link";

export default function Page() {

    return (

        <div className="max-w-lg mx-auto mt-12 px-6">

            <Logo size={56}></Logo>

            <h1 className="mt-10 text-2xl">

                Entrar na sua conta

            </h1>

            <div className="mt-10 mb-14 flex flex-col gap-6">

                <SignInForm />

                {/* BOTÃO RESET */}
                <Link
                    href="/reset"
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

                    Esqueceu a senha?

                </Link>

            </div>

            <div className="
                flex
                flex-col
                justify-center
                items-center
                gap-1
                md:flex-row
            ">

                <div className="text-gray-500">

                    Já tem uma conta?{" "}

                    <Link
                        href="/signup"
                        className="
                            text-white
                            hover:underline
                        "
                    >

                        Criar uma conta Z

                    </Link>

                </div>

            </div>

        </div>

    );

}