



export default function Toaser() { 
   return ( 
      <div className="max-w-xs bg-red-500 text-sm text-white rounded-xl shadow-lg" role="alert"  aria-labelledby="hs-toast-solid-color-red-label">
    <div id="hs-toast-solid-color-red-label" className="flex p-4">
      Hello, world! This is a toast message.

      <div className="ms-auto">
        <button type="button" className="inline-flex shrink-0 justify-center items-center size-5 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-hidden focus:opacity-100" aria-label="Close">
          <span className="sr-only">Close</span>
          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
    </div> 
    </div>
   )
}