import { useState } from "react"
import { userLogin } from "../API/userRequest"
import { useNavigate } from "react-router-dom"
import {Link} from "react-router-dom"
const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" })
    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const Navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await userLogin(formData)
        if (response.status === 200) {
            window.localStorage.setItem("token", response?.data)
            Navigate("/")
        }
    }
    return (
        
        <div className="flex h-[100vh] w-[100vw] justify-center items-center bg-gradient-to-b to-[#0b090a] from-[#92e9a5]">
            <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 text-gray-800 bg-gray-30">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-8xl font-bold">Sign in</h1>
                    <p className="text-xs text-white">Sign in to access your account</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-12 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                            <input type="email" name="email" id="email" value={formData.email} onChange={handleInput} placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm">Password</label>
                            </div>
                            <input type="password" name="password" value={formData.password} onChange={handleInput} id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-emerald-600 text-gray-50">Sign in</button>
                        </div>
                        <p className="px-6 text-sm text-center text-gray-600">Don't have an account yet?
                            <Link to="/register"   className="hover:underline text-emerald-600">Sign up</Link>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login