"use client"

import Image from "next/image"

const Header = () => {

   return (
      <header className="bg-white">
         <nav aria-label="Global" className=" z-40 mr-5 flex py-2 w-screen items-center justify-baseline  lg:px-4 fixed bg-[#00000A]/20"> 
         <div className="w-screen flex items-center justify-center px-3"> 
         <div className="flex lg:flex-1">
               <a href="#" className="-m-1.5 p-1">
                
                  <Image
                     alt=""
                     width={200}
                     height={100}
                     src="/images/logo.svg"
                     className="h-10 w-40"
                  />
               </a>
            </div>


            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
               <a href="#" className="text-sm/6 font-semibold py-4 px-3 border border-amber-700 rounded-xl text-white">
                  IR PARA PLATAFORMA
               </a>
            </div>

         </div>
           
         </nav>

      </header>
   )
}

export default Header
