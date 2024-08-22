// import Login from '@/components/Authentication/Login'
// import SignUp from '@/components/Authentication/SignUp'
// import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

const Homepage = () => {
    return (
        <div className='flex  flex-col justify-center items-center w-screen h-screen'>
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
