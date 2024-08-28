import { ChatState } from '@/context/ChatProvider'
import { FormControl, Input, Spinner, Toast, useToast } from '@chakra-ui/react'
import { FaArrowLeft } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import { getSenderFull } from '@/config/ChatLogic';
import ProfileModal from '@/miscellaneous/ProfileModal';
import UpdateGroupChatModal from '@/miscellaneous/UpdateGroupChatModal';
import debounce from '@/miscellaneous/debounce';

const SingleChat = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
    const { user, selectedChat, setSelectedChat } = ChatState()
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    const handleBack = () => {
        setSelectedChat("")
        console.log("selectedChat: ", selectedChat)
    }

    const toast = useToast()
    const fetchMessage = async () => {
        if (!selectedChat) return
        try {
            setLoading(true)
            const token = localStorage.getItem("token")
            const res = await fetch(`http://localhost:5000/api/messages/allMessage/${selectedChat._id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json()
            console.log("messages: ", data)
            setMessages(data)
            setLoading(false)
        } catch (error) {
            toast({
                title: "failed to load messages",
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }
    }
    useEffect(() => {
        fetchMessage()
    }, [selectedChat])

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            try {

                const token = localStorage.getItem("token")
                setNewMessage("")
                const res = await fetch("http://localhost:5000/api/messages/sendMessage", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        chatId: selectedChat._id,
                        content: newMessage
                    })
                })

                const data = await res.json()
                console.log("sender message data: ", data)

                setMessages([...messages, data])

            } catch (error) {
                toast({
                    title: "failed to send message",
                    status: "error",
                    duration: 3000,
                    isClosable: true
                })
            }
        }
    }



    const typingHandler = (e) => {
        console.log("typing: ", e.target.value)
        setNewMessage(e.target.value)
        // typing indicator logic
    }



    return (
        <div className='flex  h-full'>
            {
                selectedChat ? (
                    <div className='flex flex-col m-5 w-full'>

                        <div className=' '>
                            <FaArrowLeft onClick={handleBack} className='text-white md:hidden hover:cursor-pointer scale-90 ' />
                            {
                                selectedChat.isGroupChat ?
                                    (
                                        <div className='flex flex-row justify-between '>
                                            <div className='text-white  w-fit px-3 py-1 rounded-xl bg-gradient-to-r from-purple-950 to-cyan-800 font-bold'>{selectedChat.chatName.toUpperCase()}</div>
                                            <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages} />


                                        </div>
                                    ) :
                                    (<div className='flex flex-row justify-between '>
                                        <div className='text-white  w-fit px-3 py-1 rounded-xl bg-gradient-to-r from-purple-950 to-cyan-800 font-bold'>{selectedChat.users[1].name.toUpperCase()}</div>
                                        <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                                    </div>
                                    )

                            }


                        </div>
                        <div className='text-white flex flex-grow overflow-y-scroll '>
                            {/* all the messages would appear here */}
                            {loading ? (
                                <Spinner size='xl' h-{10} w={10} alignSelf='center' />
                            ) : (
                                <div>
                                    <ScrollableChat messages={messages} />
                                </div>
                            )
                            }
                        </div>
                        <FormControl onKeyDown={sendMessage} isRequired mt={3}>

                            <Input
                                placeholder='Enter message'
                                onChange={typingHandler}
                                value={newMessage}
                                className='text-white'
                            />
                        </FormControl>
                    </div >
                ) : (
                    <div className='flex justify-center items-center w-full h-full text-xl text-white'>
                        Select User to get started with chat
                    </div>
                )
            }
        </div>

    )
}

export default SingleChat
