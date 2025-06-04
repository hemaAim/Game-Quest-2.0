export default function SkeletonTable() {
   const skeletonRows = Array.from({ length: 6 }); // 6 linhas fake

   return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-[#07070F] animate-pulse">
         <h2 className={`m-3 text-2xl p-2 text-gray-500`}>Insira o codigo para ver sua turma</h2>

         <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-gray-100 uppercase">
               <tr>
                  <th className="px-6 py-3">nome</th>
                  <th className="px-6 py-3">GEMA</th>
                  <th className="px-6 py-3">turma</th>
                  <th className="px-6 py-3"> </th>
               </tr>
            </thead>
            <tbody>
               {skeletonRows.map((_, index) => (
                  <tr key={index} className="bg-[#07070F] border-b border-gray-900/20">
                     <td className="px-6 py-4">
                        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                     </td>
                     <td className="px-6 py-4">
                        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                     </td>
                     <td className="px-6 py-4">
                        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                     </td>
                     <td className="px-6 py-4">
                        <div className="h-8 bg-gray-600 rounded w-20"></div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};
