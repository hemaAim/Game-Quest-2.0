"use client"
import Image from "next/image";
import { UpdateUserClasse } from "@/services/service-Aluno";
import {
   Input,
   Popover,
   PopoverButton,
   PopoverGroup,
   PopoverPanel,
} from "@headlessui/react";
import { Bebas_Neue, Orbitron } from "next/font/google";
import { useState } from "react";

interface Link {
   name: string;
   link: string;
}

interface HeaderProps {
   TextButton?: string;
   link: Link[];
   handleLogout?: () => void;
   StudentName?: any;
   StudentPhoto?: string | null;
   turma?: string | null
   IdStudent: number;
   StudentEmail: string | null
}


const products = [
   {
      name: "Analytics",
      description: "Get a better understanding of your traffic",

   },

];
const bebasNeue = Bebas_Neue({
   weight: ["400"]
})
export default function Header({
   TextButton,
   link,
   handleLogout,
   StudentPhoto,
   StudentName,
   turma,
   IdStudent,
   StudentEmail
}: HeaderProps) {
   const [turmaUser, setTurma] = useState('')


   const handleClasse = async (e: React.FormEvent) => {
      e.preventDefault();


      try {
         const newUserCredential = await UpdateUserClasse(IdStudent, turmaUser);

      } catch (err: any) {
         console.error("Erro ao criar usuário:", err.message);
         alert("Erro ao criar usuário: " + err.message);
      }
   };
   return (
      <header className=" flex flex-col w-screen md:flex-row justify-between items-center px-6 md:px-10 py-4 border-b border-gray-700 gap-4 ">

         <a href="gamequest.com">
            <Image
               src={"/login/LogoBranca.svg"}
               alt="Logo da empresa"
               width={180}
               height={90}
            />
         </a>

         <nav className="flex flex-wrap justify-center gap-4 md:gap-8 text-lg">
            {link.map((item, index) => (
               <a key={index} href={item.link} className="hover:text-orange-400 text-white">
                  {item.name}
               </a>
            ))}
         </nav>

         <div className="flex items-center gap-4">
            {/* Avatar com nome */}
            <div className="flex items-center gap-2 py-2 px-4 w-fit rounded-full border border-orange-500 cursor-pointer transition">
               <Image
                  src={StudentPhoto || "/Images/avatarNull.png"}
                  alt="Avatar do aluno"
                  width={32}
                  height={32}
                  className="rounded-full"
               />
               <p className="text-white font-semibold">{StudentName}</p>



               <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                  <Popover className="relative">
                     <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-white">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-4 w-4 text-white"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                     </PopoverButton>

                     <PopoverPanel className="absolute right-1/10 top-full  z-10 mt-3 w-sm overflow-hidden rounded-xl bg-zinc-900  shadow-lg ring-1 ring-gray-900/5">
                        <div className=" mt-2  px-4 py-2 flex items-center gap-3 border-b-1 border-zinc-700  ">

                           <Image
                              src={StudentPhoto || "/Images/avatarNull.png"}
                              alt="Avatar do aluno"
                              width={38}
                              height={38}
                              className="rounded-full bg-white"
                           />

                           <div className="flex flex-col">
                              <p className="text-white font-semibold leading-tight">{StudentName}</p>
                              <p className="text-gray-500 font-light  text-sm leading-tight flex items-center gap-2">{StudentEmail} <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <circle cx="6" cy="6" r="6" fill="#22C55E" />
                              </svg>
                              </p>

                           </div>
                        </div>


                        {turma === "Vazio" ? (
                           <div className="flex  flex-col justify-center items-center mt-2">

                              <h2 className={`${bebasNeue.className}  text-2xl text-gray-500 p-1`}>Selecione o codigo da sua turma:</h2>
                              <div className="grid grid-cols-3 justify-center items-center mx-1  pt-1  mb-6">
                                 <div className="w-full col-span-2 px-3 mb-6 md:mb-0">


                                    <select
                                       id="turma"
                                       name="turma"
                                       value={turmaUser}
                                       onChange={(e) => setTurma(e.target.value)}
                                       className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                       <option value="">Selecione a turma</option>
                                       <option value="MVM2110">MVM2110</option>
                                       <option value="MVM2210">MVM2210</option>
                                       <option value="MVM3113">MVM3113</option>
                                       <option value="MVM3213">MVM3213</option>
                                       <option value="MVM4111">MVM4111</option>
                                       <option value="MVM4211">MVM4211</option>
                                       <option value="MVM5115">MVM5115</option>
                                       <option value="MVM5215">MVM5215</option>
                                       <option value="MVM6114">MVM6114</option>
                                       <option value="MVM6214">MVM6214</option>
                                    </select>
                                 </div>
                                 <button onClick={handleClasse} className=" col-span-1 text-sm font-semibold py-3 px-2 cursor-pointer bg-[#FF6F00] hover:bg-orange-600 transition rounded-lg text-white">Enviar</button>
                              </div> </div>

                        ) : (
                           <div className="mt-2 rounded-md px-4 py-2">
                              <div className=" mt-2 rounded-md px-4 py-2">
                                 <h3 className="text-white text-sm font-semibold">Turma</h3>
                                 <p className="text-gray-300 text-sm">{turma}</p>
                              </div>
                           </div>
                        )}


                     </PopoverPanel>
                  </Popover>
               </PopoverGroup>
            </div>



            {/* Menu de produtos (desktop) */}


            {/* Botão de logout */}
            <button
               onClick={handleLogout}
               className={`${bebasNeue.className} text-sm font-semibold py-4 px-6 cursor-pointer bg-[#FF6F00] hover:bg-orange-600 transition rounded-full text-white`}
            >
               {TextButton}
            </button>
         </div>
      </header>
   );
}
