import { Form, Formik } from "formik";
import { myAxios } from "../services/Helper";
import {initFlowbite} from 'flowbite';
import { useEffect, useState } from "react";

const Staff = () => {

    const [registrations, setRegistrations] = useState([]);

    const registerState = {
        fullName: "",
        email: "",
        username: "",
        password: "",
        role: "ADMIN"
    }

    const register=async(val)=>{
        try{
            const response = await myAxios.post('/api/registration/register',val);
            if(response.status === 200){
                alert('User added');
            }
        }catch(error){
            alert(error);
        }
    }
    const fetchRegistration=async()=>{
        try{
            const response = await myAxios.get('/api/registration');
            setRegistrations(response.data);
        }catch(error){
            alert(error);
        }
    }


    useEffect(()=>{
        initFlowbite();
        fetchRegistration();
    },[]);

    return (
        <>
            <div className="bg-gray-50 flex dark:bg-gray-800">
                <section class="bg-gray-50 w-2/4 dark:bg-gray-800">
                    <div class="flex flex-col px-6 py-8 mx-auto md:h-screen lg:py-0">

                        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Add an admin account
                                </h1>
                                <Formik
                                initialValues={registerState}
                                onSubmit={(val)=>{register(val)}}
                                >

                                <Form class="space-y-4 md:space-y-6">
                                <div>
                                        <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full name</label>
                                        <input type="text" name="fullName" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" />
                                        
                                    </div>
                                    <div>
                                        <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                        <input type="text" name="username" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" />
                                        
                                    </div>
                                    <div>
                                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div>
                                        <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                        <input  type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>

                                    <button type="submit" class="w-full  text-black bg-blue-200 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>

                                </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="w-1/2">

                    <p className="text-center font-bold text-xl p-4 dark:text-white">System admins</p>

                    <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                        {registrations.length !== 0 ? (
                            registrations.map((user,index)=>(
                                <li class="pb-3 sm:pb-4 p-2">
                            <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                <div class="flex-shrink-0">
                                    <img class="w-8 h-8 rounded-full" src={user.profileImage} alt={user.username} />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {user.username}
                                    </p>
                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                       {user.email}
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {user.date}
                                </div>
                            </div>
                        </li>
                            ))
                            
                        ) : (<h2>No system users found</h2>) }
                        
                    </ul>
                </div>

            </div>
        </>
    );
}
export default Staff;