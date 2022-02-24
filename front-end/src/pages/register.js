import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../apis";
import { toast } from "react-toastify";

export default function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullname: ''
    })

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    async function handleRegister(e) {
        e.preventDefault();
        const response = await register(formData);
        if(response.status === 201) {
            toast.success("Register Success");
            navigate('/login');
        }
        else {
            toast.error(response.data.message);
        }
    }


    return (
        <div class="p-2 my-10">
        <div class="block lg:flex bg-white lg:shadow-lg rounded-lg">
            <div class="w-full lg:w-1/3 flex lg:border-r border-gray-200">
                <div class="m-auto rounded-full">
                    <a href="/" class="flex items-base pt-10 lg:p-2 -mb-10 lg:-mb-0">
                        <img src="https://parsinta.com/logo/blue.png" alt="" class="w-12 lg:w-48" />
                        <div class="block lg:hidden text-2xl text-primary hover:text-primary tracking-wide font-semibold uppercase">Parsinta</div>
                    </a>
                </div>
            </div>
            <div class="w-full lg:w-2/3 px-6 py-16">
                <div class="mb-4 font-light tracking-widest text-2xl">REGISTER</div>
                <form>
                    <div class="mb-4">
                        <label for="username" class="block mb-2 text-sm text-gray-800">Email</label>
                        <input type="username" name="username" value={formData.username} onChange={handleChange} id="email" class="focus:border-blue-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" />
                        <div v-if="feedback.email.error">
                            <div class="text-sm text-red-500 mt-2" v-text="feedback.email.message"></div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label for="password" class="block mb-2 text-sm text-gray-800">Your password</label>
                        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} class="focus:border-blue-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" autocomplete="current-password" required />
                    </div>
                    {/* <div class="mb-4">
                        <label for="password" class="block mb-2 text-sm text-gray-800">Confirm password</label>
                        <input type="password" name="passwordConfirm" id="password" class="focus:border-blue-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" autocomplete="current-password" required />
                    </div> */}
                    <div class="mb-4">
                        <label for="fullname" class="block mb-2 text-sm text-gray-800">Full Name</label>
                        <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} id="fullname" class="focus:border-blue-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" autocomplete="current-password" required />
                    </div>
                 
                    <div class="block md:flex items-center justify-between">
                        <button type="submit" onClick={handleRegister} class="align-middle bg-blue-500 hover:bg-blue-600 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg">REGISTER</button>

                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}