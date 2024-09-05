// import Login from '@/components/Authentication/Login'
// import SignUp from '@/components/Authentication/SignUp'
// import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

const Homepage = () => {
    return (
        <div className='flex  flex-col justify-center items-center w-screen h-screen'>
            <div className='flex flex-col justify-center items-center gap-2 m-6'>
                <h1 className='text-3xl font-bold text-cyan-600 rounded-3xl bg-gradient-to-r from-cyan-900 to-black p-4 shadow-lg shadow-gray-900'>CHAT-DASH</h1>
                <p className='text-gray-600'>Chat with your friends , family and groups</p>

            </div>
            <div className='flex flex-row gap-4 '>
                <Link to="/login"><Button colorScheme='teal' variant='outline'>
                    Login
                </Button></Link>

                <Link to="signup"><Button colorScheme='teal' variant='outline'>
                    SignUp
                </Button></Link>
            </div>
            {/* <Login />
            <SignUp /> */}
        </div>
    )
}

export default Homepage
