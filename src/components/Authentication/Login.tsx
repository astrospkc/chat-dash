import axios from "axios"
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Button from "../UIComponent/Button"


const Login = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        username: "@rita",
        password: "rita@"
    })
    const [loginLoad, setLoginLoad] = useState(false)
    const handleSubmit = async () => {
        setLoginLoad(true)
        const url = `${import.meta.env.VITE_URL}/api/users/login`
        // console.log(url)
        // 
        const res = await axios.post(url, {
            username: user.username,
            password: user.password
        },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }

        )

        const data = res.data
        console.log(data)
        if (data.success) {
            setUser(data)
            // console.log("token while login: ", data.authtoken)
            localStorage.setItem("token", data.authtoken)
            alert("happy login")
            navigate("/chat")

        } else {
            alert("invalid credentials")
        }
        setLoginLoad(false)

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    if (loginLoad) {
        return (
            <div className="w-full h-full flex items-center  justify-center bg-black ">
                <div className="text-white">
                    ......loading
                </div>
            </div>
        )
    }

    const handleSignup = () => {
        navigate("/signup")
    }


    return (
        <div className='flex flex-col justify-center items-center m-auto h-screen w-full'>
            {/* username, password */}
            <div className="text-4xl my-4 font-bold text-white barrio-regular">Login</div>
            <div className='bg-gradient-to-t from-blue-400 to bg-cyan-950 p-10 flex flex-col rounded-xl gap-4 items-start '>
                <div className='p-4  flex flex-col'>
                    <label htmlFor="" className='text-xl font-bold text-white mb-4'>Username</label>
                    <input type="text" className='p-3 rounded-xl ' name="username" defaultValue={user.username} onChange={handleChange} />
                </div>
                <div className='flex flex-col p-4'>
                    <label htmlFor="password" className='text-xl font-bold text-white mb-4'>Passowrd</label>
                    <input type="password" className='p-3 rounded-xl' name="password" defaultValue={user.password} onChange={handleChange} />
                </div>
                <div className='flex flex-col w-full items-center'>
                    <Button onclick={handleSubmit}>Submit</Button>
                    <div className="flex items-center gap-4">
                        <div className="text-xl font-bold border-b-2 border-black">
                            Create new account
                        </div>
                        <Button onclick={handleSignup}>Sign up</Button>
                    </div>

                </div>


            </div>

        </div>
    )
}

export default Login
