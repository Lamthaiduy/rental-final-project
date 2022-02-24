import { useState } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { loginApi } from "../apis"
import { loginAction } from "../reducers/action/authAction"

function Login(props) {
    const {login} = props;

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    function handleOnChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);
        const response = await loginApi(formData);
        if(response.status === 200) {
            toast.success("Login Success");
            login(response.data)
            navigate('/');
        }
        else {
            toast.error('Login Failed');
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
                <div class="mb-4 font-light tracking-widest text-2xl">LOGIN</div>
                <form>
                    <div class="mb-4">
                        <label htmlFor="username" class="block mb-2 text-sm text-gray-800">Email</label>
                        <input type="text" name="username" id="email" onChange={handleOnChange} value={formData.username} class="focus:border-blue-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" required />
                        <div v-if="feedback.email.error">
                            <div class="text-sm text-red-500 mt-2" v-text="feedback.email.message"></div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label htmlFor="password" class="block mb-2 text-sm text-gray-800">Your password</label>
                        <input type="password" name="password" id="password" onChange={handleOnChange} value={formData.password} class="focus:border-blue-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" required />
                    </div>
                    <label class="mb-4 flex items-center">
                        <input type="checkbox" class="form-checkbox" name="remeber" id="remeber" />
                        <span class="ml-2">I want to remember you ?</span>
                    </label>
                    <div class="block md:flex items-center justify-between">
                        <button type="submit" onClick={handleSubmit} class="align-middle bg-blue-500 hover:bg-blue-600 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg">LOGIN</button>

                        <a class="text-gray-600 hover:text-gray-700 no-underline block mt-3" href="/password/reset">
                            Forgot Your Password?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

const mapDispatchToProps = function(dispatch) {
    return {
        login: function (data) {
            return dispatch(loginAction(data))
        }
    }
}

export default connect(null, mapDispatchToProps)(Login);