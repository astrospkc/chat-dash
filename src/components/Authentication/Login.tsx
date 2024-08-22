
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState({

        username: "",

        password: "",

    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch("http://localhost:4000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input)
        })
        const data = await res.json();
        console.log("data: ", data)
        if (data.status == 201) {
            console.log("data: ", data)

        }
        if (data.success) {
            console.log("auth token: ", data.authToken);
            localStorage.setItem("token", data.authToken)
            alert("happy logged in ")
            navigate("/chat")
        } else {
            alert("invalid credentials")
        }
    }

    // const [pic , setPic] = useState()

    const handleInputChange = (e) => {
        if (e.target.name === 'pic') {
            setInput({ ...input, [e.target.name]: e.target.files[0] });
        } else {
            setInput({ ...input, [e.target.name]: e.target.value });
        }
    };

    return (
        <div className='flex  justify-center items-center w-full h-screen'>

            <div>
                <h1 className='text-white text-3xl'>Welcome to chat DXV</h1>
                <form action="submit" onSubmit={handleSubmit}>

                    <div className='my-4'>
                        <label htmlFor="name" className='my-3 text-white'>Username</label>
                        <input type="text" name='username' onChange={handleInputChange} className='p-3 w-full' />
                    </div>

                    <div className='my-4'>
                        <label htmlFor="name" className='my-3 text-white'>Password</label>
                        <input type="password" name='password' onChange={handleInputChange} className='p-3 w-full' />
                    </div>
                    <button className='my-3 p-3 w-fit border-2 border-white text-white' type='submit'>
                        Submit

                    </button>
                </form>

            </div>




        </div>

    )
}

export default Login