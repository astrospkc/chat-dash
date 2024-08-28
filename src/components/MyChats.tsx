import { getSender } from '@/config/ChatLogic'
import { ChatState } from '@/context/ChatProvider'
import NewGroupModal from '@/miscellaneous/NewGroupModal'
import { Box, Stack, Text, useToast } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
import ChatLoading from './ChatLoading'

const MyChats = ({ fetchAgain }) => {



    const [loggedUser, setLoggedUser] = useState()
    const { selectedChat, setSelectedChat, chats, setChats, user } = ChatState()
    console.log("user: ", user)
    console.log("selectedChat: ", selectedChat)



    const toast = useToast()
    const fetchChats = async () => {
        try {
            const token = localStorage.getItem("token")
            const res = await fetch("http://localhost:5000/api/chats/fetchChat", {
                method: "GET",
                headers: {
                    // "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                // body: JSON.stringify(selected)
            })
            const data = await res.json()
            console.log("data: ", data)
            setChats(data)

        } catch (error) {
            toast({
                title: 'failed to load the result',
                status: 'warning',
                duration: 9000,
                isClosable: true,
                position: 'bottom-left'
            })
        }

    }

    //user: {_id: '66c844030cf5028aba708139', name: 'rita', username: '@rita', email: 'rita@gmail.com', pic: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg', …}

    // if this is the user I am getting then why the setLoggedUser is not updating with this value, -> ans-> in dependency array , put the user in it.

    useEffect(() => {

        setLoggedUser(user)
        fetchChats()
    }, [user, fetchAgain])
    console.log("logged user: ", loggedUser)
    console.log("chats: ", chats)
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row justify-around gap-5 my-4 ml-1'>
                <h1 className=' text-white'>My Chats</h1>
                <NewGroupModal />
            </div>
            <div>
                {chats ? (
                    <Stack overflowY="scroll">
                        hi there
                        {chats.map((chat) => (
                            <Box
                                onClick={() => setSelectedChat(chat)}
                                cursor="pointer"
                                key={chat._id}
                                bg={selectedChat === chat ? "#38b2ac" : "#E8E8E8"}
                                color={selectedChat === chat ? "white" : "black"}
                                px={3}
                                py={2}
                                borderRadius="lg"

                            >
                                <Text
                                    m={4}>

                                    {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
                                </Text>

                            </Box>
                        ))}

                    </Stack>
                ) :
                    <ChatLoading />
                }
            </div>


        </div>
    )
}

export default MyChats
