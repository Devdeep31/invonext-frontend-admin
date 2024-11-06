import axios from "axios";
import { Formik, Form, Field } from "formik"; // Import Form and Field from Formik
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Remove Form import from react-router-dom
import { myAxios } from "./Helper";

const ShopNextLogin = () => {
    const navigate = useNavigate(); // To redirect page

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);

    // State for login data
    const loginState = {
        email: username,
        pass: password,
    };

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submit behavior

        try {
            const response = await axios.post('http://localhost:9000/api/customer/login', loginState);
            if (response.status === 202 && response.data.isAuthenticated) {
                localStorage.setItem('useremail', response.data.email);
                navigate("/shopcart/home");
            }
        } catch (error) {
            alert('Login failed!');
        }
    };

    // Initial registration data
    const registerState = {
        name: "",
        email: "",
        password: "",
        phonenumber: ""
    };

    // Handle registration form submission
    const handleRegister = async (val) => {
        try {
            const response = await myAxios.post('/api/customer/add', val);
            alert('You are registered, welcome!');
            setIsRegister(false); // Switch back to login after registration
        } catch (error) {
            alert('Registration failed!');
        }
    };

    return (
        <div className="flex dark:bg-gray-800 ">

            {/* Left Section: Login Form */}
            <section className="bg-gray-50 dark:bg-gray-800 w-1/2">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex gap-2 items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <i class='bx bxs-shopping-bags text-4xl'></i><h1>ShopCart</h1>

                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            {/* Login Form */}
                            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <button type="submit" className="w-full text-black dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

                                <button
                                    onClick={() => { window.location.href = "http://localhost:9000/oauth2/authorization/google"; }}
                                    className="flex bg-gray-200 p-2 text-sm m-auto rounded-lg"
                                >
                                    <img className="h-6" src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png" alt="Google logo" />
                                    Sign in with Google
                                </button>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?{" "}
                                    <button onClick={() => setIsRegister(true)} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Right Section: Registration Form */}
            {isRegister && (
                <section className="bg-gray-50 w-1/2 dark:bg-gray-800">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Sign up
                                </h1>
                                {/* Registration Form with Formik */}
                                <Formik
                                    initialValues={registerState}
                                    onSubmit={handleRegister}
                                >
                                    {({ values, handleChange }) => (
                                        <Form className="space-y-4 md:space-y-6">
                                            <div>
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full name</label>
                                                <Field type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Full Name" required />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                <Field type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Email" required />
                                            </div>
                                            <div>
                                                <label htmlFor="phonenumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact number</label>
                                                <Field type="text" name="phonenumber" id="phonenumber" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Phone Number" required />
                                            </div>
                                            <div>
                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                                <Field type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                                            </div>
                                            <button type="submit" className="w-full bg-blue-200 text-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>

                </section>
            )}
            {
                !isRegister ? (<div className="m-auto">
                    <img className="h-[600px]" src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?t=st=1730550761~exp=1730554361~hmac=06e01a8750afa5bcaa255c85582e48d8153e66616427ed9e4858debc82ffb359&w=740"></img>
                </div>) : ('')}

        </div>
    );
};

export default ShopNextLogin;
