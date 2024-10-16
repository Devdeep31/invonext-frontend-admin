import 'flowbite';
import { initFlowbite } from 'flowbite'
import { useEffect } from 'react';

const Flowbite = () =>{
    useEffect(() => {
     return   initFlowbite();
    }, []);
}
export default Flowbite;