import { Navbar } from "flowbite-react";
import { Outlet } from "react-router-dom";
import ClientNav from "./Navbar";


const ClientApplication =()=>{
    
    return(
        <>
        
        <div className='flex h-screen'>
        <div className='flex-1 flex-col flex'>
        <ClientNav/>
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          {/* The Outlet renders the matched child routes */}
         {/* <div className='absolute bottom-0 right-0  '>
            <img className='h-16 shadow-sm rounded-full ' src={B}></img>
         </div> */}

          <Outlet /> 
        </main>
        </div>
        </div>
     
      </>
    );
}
export default ClientApplication;