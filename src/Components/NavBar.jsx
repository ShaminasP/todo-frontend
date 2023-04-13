import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
const Navbar = () => {
    const [token, setToken] = useState(null)
    const Navigate = useNavigate()
    useEffect(() => {
        const Token = window.localStorage.getItem('token')
        setToken(Token)
    }, [])

    const logout = () => {
        window.localStorage.removeItem('token')
        setToken(null)
        Navigate('/login')

    }
    return (

        <nav className="bg-green-950 fixed w-full z-20 top-0 left-0 border-b border-gray-600">
            <div className="flex justify-between px-10 py-4 items-center">
                <Link to="/report" className="py-2 pl-3 pr-4  rounded text-blue-500">Report</Link>
                {token ? <button className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800" onClick={logout}>Log out</button> :
                    <Link to="/login" className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Login</Link>}  </div>
        </nav>

    )
}

export default Navbar