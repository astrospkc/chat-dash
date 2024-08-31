import { getSender } from '@/config/ChatLogic'
import { ChatState } from '@/context/ChatProvider'
import NewGroupModal from '@/miscellaneous/NewGroupModal'
import { Stack, Text, useToast } from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import ChatLoading from './ChatLoading'
import { UserType } from './types/types'
// import { BsThreeDotsVertical } from "react-icons/bs";

interface MyChatsProps {
    fetchAgain: boolean
    // user: UserType
}


const MyChats: React.FC<MyChatsProps> = ({ fetchAgain }) => {



    const [loggedUser, setLoggedUser] = useState<UserType | undefined>(undefined)
    const { selectedChat, setSelectedChat, chats, setChats, user } = ChatState()
    //console.log("user: ", user)
    //console.log("selectedChat: ", selectedChat)



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

    //user: {_id: '66c844030cf5028aba708139', name: 'rita', username: '@rita', email: 'rita@gmail.com', pic: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg', …}

    // if this is the user I am getting then why the setLoggedUser is not updating with this value, -> ans-> in dependency array , put the user in it.

    useEffect(() => {

        setLoggedUser(user)
        fetchChats()
    }, [user, fetchAgain])
    //console.log("logged user: ", loggedUser)
    //console.log("chats: ", chats)

    // const RemoveUser = (chatId) => {
    //     console.log("chatId clicked: ", chatId)
    //     const chatToRemove = chats.findIndex(() => chats.includes(chatId))
    //     if (chatToRemove !== -1) {
    //         chats.splice(chatToRemove, 1)
    //     }

    // }

    // useEffect(() => {
    //     setChats(chats)
    // }, [chats])

    // console.log("chats in the my chats: ", chats)


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
                                    onClick={() => setSelectedChat(chat)}
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
