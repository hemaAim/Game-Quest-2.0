"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firabase.config";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Carousel from "../component/Carrocel";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link";

const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signInWithEmailAndPassword,  error] =
    useSignInWithEmailAndPassword(auth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return alert("Preencha email e senha.");
    try {
      const user = await signInWithEmailAndPassword(email, password);
      if (user) {
        const token = await user.user.getIdToken();
        console.log("Token:", token);
        router.replace("/dashboard");
      }
    } catch (err: any) {
      alert("Erro no login: " + err.message);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      await signInWithPopup(auth, provider);
      router.replace("/");
    } catch (err: any) {
      alert("Erro no login com Google: " + err.message);
    }
  };

  useEffect(() => {
    if (error) alert("Erro ao logar: " );
  }, [error]);

  const frases = [
    "Inove com criatividade.",
    "A tecnologia transforma o mundo.",
    "O futuro é agora.",
    "Aprender é um superpoder.",
  ];

  return (
    <>
      <div className={`${poppins.className} h-screen flex items-center justify-center `}>

        <div className="w-full max-w-6xl bg-white h-10/12 max-h-[600px] items-start justify-between rounded-[20px] overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2">
          {/* Left side */}
          <div className="px-10 py-12 flex flex-col   justify-center">
        
            <h2 className="text-3xl font-semibold mb-2 text-[#030051]">Login</h2>
            <p className="text-gray-600 mb-6">Insira suas credencias para logar na plataforma</p>

            <div className="flex gap-4 mb-4">
              <button onClick={signInWithGoogle} className="flex items-center justify-center gap-2 border border-gray-400 rounded-md cursor-pointer py-3 px-3 w-full text-base  text-gray-900 font-bold hover:bg-gray-100/50">
                <Image src="/Login/google-icon-logo.svg" alt="Google" width={20} height={20} />
                login com Google
              </button>

            </div>
            <div className="grid grid-cols-9 items-center gap-2 my-5 ">
              <div className="w-full h-[1px] col-span-4 bg-gray-300"></div>
              <div className="text-center col-span-1 text-sm text-gray-400">ou</div>
              <div className="w-full h-[1px] col-span-4 bg-gray-300"></div>
            </div>


            <form className="flex flex-col gap-4">

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full border border-gray-300 rounded-md px-4 py-2  text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="min 8 chars"
                  className="w-full border border-gray-300 rounded-md px-4 py-2  text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <label className="flex items-center text-sm text-gray-500 gap-2">
                <input type="checkbox" className="mr-2 m-2" />
                Eu aceito os termos <Link href="#" className="text-blue-500 underline">Terms & Privacy</Link>
              </label>

              <button onClick={handleLogin} className="bg-[#FF6F00] text-white py-2 rounded-md cursor-pointer text-sm font-medium hover:bg-[#E36300]">
                Login
              </button>
            </form>
    <p className="text-sm text-center text-gray-500 mt-6">
              Não tenho conta <Link href="/cadastro" className="text-blue-500 underline">cadastro</Link>
            </p>

          </div>

          {/* Right side */}
          <div className=" md:block bg-[#07070F]  relative px-10 py-12 flex flex-col align-center justify-center">

            <div className="mb-8">
              <Image
                src="/Login/LogoBranca.svg"
                alt="Logo"
                width={190}
                height={40}
              />
            </div>

            <div className="w-full h-screen">
              <Carousel phrases={frases} />
            </div>
          </div>




        </div>
      </div>
    </>



  )
}



export default SignIn

