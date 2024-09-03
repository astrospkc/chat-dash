

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface InputState {
    pic?: File | null;
    username: string;
    password: string
}
const Login = () => {
    const navigate = useNavigate()
    const [loginLoad, setLoginLoad] = useState(false)
    const [input, setInput] = useState<InputState>({
        pic: null,
        username: "@rita",

        password: "rita@",

    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(import.meta.env.VITE_URL, import.meta.env.KEY)
        setLoginLoad(true)
        const res = await fetch(`${import.meta.env.VITE_URL}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input)
        })
        const data = await res.json();
        //console.log("data: ", data)

        if (data.status == 201) {
            //console.log("data: ", data)

        }
        if (data.success) {
            //console.log("auth token: ", data.authtoken);
            localStorage.setItem("token", data.authtoken)
            alert("happy logged in ")

            navigate("/chat")
        } else {
            alert("invalid credentials")
        }
        setLoginLoad(false)
    }

    // const [pic , setPic] = useState()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        if (target.name === 'pic' && target.files) {
            setInput({ ...input, [target.name]: target.files[0] });
        } else {
            setInput({ ...input, [target.name]: target.value });
        }
    };
    console.log(import.meta.env.URL, import.meta.env.KEY)

    return (
        <div className='flex  justify-center items-center w-full h-screen'>

            <div>
                <h1 className='text-white text-3xl'>Chat-Dash</h1>
                <form action="submit" onSubmit={handleSubmit}>
                    {loginLoad && <div>...loading</div>}
                    <div className='my-4'>
                        <label htmlFor="name" className='my-3 text-white'>Username</label>
                        <input type="text" name='username' onChange={handleInputChange} value={input.username} defaultValue='@rita' className='text-black p-3 w-full' />
                    </div>

                    <div className='my-4'>
                        <label htmlFor="name" className='my-3 text-white'>Password</label>
                        <input type="password" name='password' onChange={handleInputChange} value={input.password} defaultValue='rita@' className='p-3 w-full' />
                    </div>
                    <button className='my-3 p-3 w-fit border-2 border-white text-white' type='submit'>
                        Submit

                    </button>
                </form>
                <h1 className='text-white'>Create Account</h1>
                <Link to="/signup">
                    <button className='my-3 p-3 w-fit border-2 border-white text-white' >
                        Sign Up

                    </button>
                </Link>


            </div>




        </div>

    )
}

export default Login