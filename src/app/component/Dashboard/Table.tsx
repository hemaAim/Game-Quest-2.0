

import { Bebas_Neue } from "next/font/google"
import React from "react"

const bebasNeue = Bebas_Neue({
   weight: ["400"]
})
interface TableProps {
   headers: string[]
   rows: (string | React.ReactNode)[][]
   title: string
}


const Table = ({ headers, rows, title }: TableProps) => {

   return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-[#07070F]">

         <table className="w-full text-sm text-left rtl:text-right  ">
              <h2 className={`${bebasNeue.className} m-3 text-2xl p-2`}>{title}</h2>
            <thead className=" text-gray-100  uppercase  ">
             
               <tr>
                  {headers.map((header, index) => (
                     <th key={index} scope="col" className="px-6 py-3 font-light">
                        {header}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody>

               {rows.map((row, rowIndex) => (
                  <tr
                     key={rowIndex}
                     className="bg-[#07070F]"
                  >
                     {row.map((cell, cellIndex) => (
                        <td
                           key={cellIndex}
                           className={`px-6 py-4 text-gray-400`}
                        >
                           {cell}
                        </td>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}


export default Table