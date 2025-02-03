import { getSender } from '@/config/ChatLogic'
import { ChatState } from '@/context/ChatProvider'
import NewGroupModal from '@/miscellaneous/NewGroupModal'
import { Stack, Text, useToast } from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import ChatLoading from './ChatLoading'
import { UserType } from './types/types'
import axios from 'axios'

// import { BsThreeDotsVertical } from "react-icons/bs";

interface MyChatsProps {
    fetchAgain: boolean
    // user: UserType
}


const MyChats: React.FC<MyChatsProps> = ({ fetchAgain }) => {

    const [loggedUser, setLoggedUser] = useState<UserType | undefined>(undefined)
    const { selectedChat, setSelectedChat, chats, setChats, user } = ChatState()


    const toast = useToast()


    const fetchChats = async () => {
        try {
            const token = localStorage.getItem("token")
            console.log("token: ", token)

            const res = await axios.get(`${import.meta.env.VITE_URL}/api/chats/fetchChat`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },

            })

            const data = await res.data
            console.log("data in myychats: ", data)
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




    useEffect(() => {

        setLoggedUser(user)
        fetchChats()
    }, [user, fetchAgain])
    ////console.log"logged user: ", loggedUser)
    ////console.log"chats: ", chats)

    // const RemoveUser = (chatId) => {
    //     //console.log"chatId clicked: ", chatId)
    //     const chatToRemove = chats.findIndex(() => chats.includes(chatId))
    //     if (chatToRemove !== -1) {
    //         chats.splice(chatToRemove, 1)
    //     }

    // }

    // useEffect(() => {
    //     setChats(chats)
    // }, [chats])

    // //console.log"chats in the my chats: ", chats)


    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-row justify-around gap-5 my-4 ml-1 w-full'>
                <h1 className=' text-white'>My Chats</h1>
                <NewGroupModal />
            </div>
            <div className="overflow-y-scroll">
                <Stack overflowY="scroll">
                    {chats ?
                        chats.map((chat) => (

                            <div key={chat._id} className='flex flex-row items-center'>
                                <div
                                    onClick={() => chat._id !== "" && setSelectedChat(chat)}
                                    className={`${selectedChat === chat ? "bg-gradient-to-r from-violet-800 to-blue-400" : "bg-gradient-to-r from-gray-800 to-blue-400"} text-white w-full rounded-xl cursor-pointer flex flex-row justify-between  gap-5 my-4 ml-1  scale-75 hover:scale-90`}


                                >
                                    <Text
                                        m={4}>

                                        {!chat.isGroupChat && loggedUser ? getSender(loggedUser, chat.users || []) : chat.chatName}
                                    </Text>


                                </div>
                                {/* <Menu>
                                    <MenuButton >
                                        <BsThreeDotsVertical className='text-white rounded-full w-fit  hover:border-2 border-gray-500 hover:cursor-pointer' />

                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem className='hover:bg-black hover:text-white' onClick={RemoveUser(chat?._id)}>Remove</MenuItem>

                                    </MenuList>
                                </Menu> */}

                            </div>


                        )


                        ) :
                        <ChatLoading />
                    }</Stack>
            </div>


        </div>
    )
}

export default MyChats
