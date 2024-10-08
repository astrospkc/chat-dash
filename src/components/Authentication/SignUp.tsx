
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
    const [input, setInput] = useState<SignInputState>({
        name: "",
        username: "",
        email: "",
        password: "",

    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch(`${import.meta.env.VITE_URL}/api/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input)
        })
        const data = await res.json();
        ////console.log"data: ", data)
        if (data.status == 201) {
            ////console.log"data: ", data)

        }
        if (data.success) {
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
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleClick = () => {
        ////console.log"click the button")
    }
    // const isError = input.name === "" || input.username === "" || input.email === "" || input.password === ""

    // const postDetails = () => {

    // }

    return (
        <div className='flex  justify-center items-center w-full h-screen'>
            <div>
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