import { SignUpForm } from "@/components/auth/signinup-form";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";

export default function Page(){
    return(
        <div className="max-w-lg mx-auto mt-12 px-6">
            <Logo size={56}></Logo>

            <h1 className="mt-10 text-2xl">Crie sua conta</h1>

            <div className="mt-10 mb-14 flex flex-col gap-6">
                <SignUpForm/>
            </div>

            <div className="flex flex-col justify-center items-center gap-1 md:flex-row">
                <div className="text-gray-500">
                    já tem conta?{" "}
                    <Link 
                        href="/signin" 
                        className="text-white hover:underline"
                    >
                        Entrar no z
                    </Link>
                </div>
            </div>
        </div>
    );
}