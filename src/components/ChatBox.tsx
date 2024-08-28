import { ChatState } from '@/context/ChatProvider'
import React from 'react'
import SingleChat from './SingleChat'

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = ChatState()
    return (
        <div className='${selectedChat ? "block" : "hidden"} md:${selectedChat && "block"} w-full h-full'>
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </div>

    )
}

export default ChatBox
