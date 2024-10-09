import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Bot from '../Resources/AI_BOT.png'
import { Outlet } from 'react-router-dom';

const DashBoard =()=>{
    return(
        <>
        <div className='flex h-screen'>
        <Sidebar/>
        <div className='flex-1 flex-col flex'>
        <Navbar/>
        <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
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
export default DashBoard;