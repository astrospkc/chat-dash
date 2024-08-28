import React from 'react'
import { IoMdClose } from "react-icons/io";
const UserBadge = ({ user, handleFn }) => {
    console.log("user badge user: ", user)
    return (
        <div className='text-center bg-cyan-400 p-2 w-fit rounded-3xl flex flex-row gap-2 items-center' onClick={handleFn}>
            <div>{user.name}</div>
            <IoMdClose className='hover:cursor-pointer' />
        </div>
    )
}

export default UserBadge
