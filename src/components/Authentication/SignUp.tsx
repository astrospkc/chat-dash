
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
interface SignInputState {
    name: string;
    username: string;
    email: string;
    password: string

}
const SignUp = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState<SignInputState>({
        name: "",
        username: "",
        email: "",
        password: "",

    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const url = `${import.meta.env.VITE_URL}/api/users/register`
        // 
        const res = await axios.post(url, {
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password
        }, {
            headers: {
                "Content-Type": "application/json",
            },

        })
        const data = res.data;
        ////console.log"data: ", data)
        if (data.status == 201) {
            ////console.log"data: ", data)

        }
        if (data.success) {
            setUser(data)
            ////console.log"auth token: ", data.authToken);
            localStorage.setItem("token", data.authToken)
            alert("happy signed in ")
            navigate("/chat")
        } else {
            alert("invalid credentials")
        }
    }

    // const [pic , setPic] = useState()

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const target = e.target as HTMLInputElement;

    //     if (target.name === 'pic' && target.files) {
    //         setInput({ ...input, [target.name]: target.files[0] });
    //     } else {
    //         setInput({ ...input, [e.target.name]: e.target.value });
    //     }
    // };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleClick = () => {
        ////console.log"click the button")
    }
    // const isError = input.name === "" || input.username === "" || input.email === "" || input.password === ""

    // const postDetails = () => {

    // }

    return (
        <div className='flex flex-col  justify-center items-center w-full h-screen'>
            <div className='flex flex-row  items-center gap-4 my-2'>
                <Link to="/">
                    <div className='text-white rounded-full w-fit border-2 border-white p-3 hover:cursor-pointer hover:border-gray-500 hover:bg-black'>
                        home
                    </div>
                </Link>
                <div className='barrio-regular text-4xl my-3 text-white'>
                    Sign Up
                </div>
            </div>

            <div className='border-2 border-gray-600 p-4 rounded-xl bg-gradient-to-b from-cyan-800 to-black shadow-xl shadow-cyan-600'>
                <h1 className='text-white text-3xl'>Chat-Dash</h1>
                <form action="submit" onSubmit={handleSubmit}>
                    <div className='my-4'>
                        <label htmlFor="name" className='my-3 text-white'>Name</label>
                        <input type="text" name='name' onChange={handleInputChange} className='p-3 w-full' />
                    </div>
                    <div className='my-4'>
                        <label htmlFor="name" className='my-3 text-white'>Username</label>
                        <input type="text" name='username' onChange={handleInputChange} className='p-3 w-full' />
                    </div>
                    <div className='my-4'>
                        <label htmlFor="name" className='my-3 text-white'>Email</label>
                        <input type="email" name='email' onChange={handleInputChange} className='p-3 w-full' />
                    </div>
                    <div className='my-4'>
                        <label htmlFor="name" className='my-3 text-white'>Password</label>
                        <input type="password" name='password' onChange={handleInputChange} className='p-3 w-full' />
                    </div>
                    <button className='my-3 p-3 w-fit border-2 border-white text-white' onClick={handleClick} type='submit'>
                        Submit

                    </button>
                </form>
                <h1 className='text-white'>Already have an account</h1>
                <Link to="/login">
                    <button className='my-3 p-3 w-fit border-2 border-white text-white' >
                        Login

                    </button>
                </Link>

            </div>


        </div>

    )
}

export default SignUp