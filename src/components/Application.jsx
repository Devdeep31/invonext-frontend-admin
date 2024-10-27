import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Bot from '../Resources/AI_BOT.png'
import { Outlet } from 'react-router-dom';

const Application =()=>{
    return(
        <>
        <div className='flex h-screen'>
        <Sidebar/>
        <div className='flex-1 flex-col flex'>
        <Navbar/>
        <main className="flex-1 p-4  overflow-y-auto bg-gray-50 dark:bg-gray-800">
          {/* The Outlet renders the matched child routes */}
         <div className='absolute bottom-0 right-0  '>
            <img className='h-16 shadow-sm rounded-full ' src={Bot}></img>
         </div>
          <Outlet /> 
        </main>
        </div>
      </div>
      </>
    );
}
export default Application;