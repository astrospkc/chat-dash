import { ChatState } from '@/context/ChatProvider';
import { FormControl, Input, Spinner, useToast } from '@chakra-ui/react';
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { getSender, getSenderFull } from '@/config/ChatLogic';
import ProfileModal from '@/miscellaneous/ProfileModal';
import UpdateGroupChatModal from '@/miscellaneous/UpdateGroupChatModal';
import ScrollableChat from '@/UsersList/ScrollableChat';
import io, { Socket } from "socket.io-client";
import { chatType, MessageProps, UserType } from './types/types';

interface SingleChatProps {
    fetchAgain: boolean
    setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>
}

const ENDPOINT = "https://chat-dash-backend-1.onrender.com";
let socket: Socket, selectedChatCompare: chatType | null;

const SingleChat: React.FC<SingleChatProps> = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = ChatState();
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState<string>("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const toast = useToast();

    console.log("selected Chat: ", selectedChat)

    // //console.log("user: ", user)

    const handleBack = () => {
        setSelectedChat({
            _id: "",
            chatName: "",
            isGroupChat: false,
            users: [],
            latestMessage: "",
            groupAdmin: {
                _id: "",
                name: "",
                username: "",
                email: "",
                password: "",
                pic: "",
            },
        });
        console.log("selected Chat: after handlling back: ", selectedChat)
    };

    const fetchMessage = async () => {
        if (!selectedChat) return;
        if (selectedChat && selectedChat._id == "") return
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:5000/api/messages/allMessage/${selectedChat._id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            setMessages(data);
            setLoading(false);
            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            console.error("Error fetching messages:", error);
            toast({
                title: "//console.logload messages",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    };

    useEffect(() => {
        socket = io(ENDPOINT);
        //console.log("user for socket: ", user)

        socket.emit("setup", user);

        socket.on("connection", () => {
            setSocketConnected(true);
        });

        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));

        // return () => {
        //     socket.disconnect();
        // };
    });

    useEffect(() => {
        socket.on("message received", (newMessageReceived: MessageProps) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
                // give notification
                // if (!notification.includes(newMessageReceived)) {
                //     setNotification([newMessageReceived, ...notification])
                // }
            } else {
                setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
            }
        });

        return () => {
            socket.off("message received");
        };
    }, [selectedChat]);

    useEffect(() => {
        fetchMessage();
        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    const sendMessage = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && newMessage) {
            try {
                const token = localStorage.getItem("token");
                setNewMessage("");
                const res = await fetch("http://localhost:5000/api/messages/sendMessage", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        chatId: selectedChat?._id,
                        content: newMessage
                    })
                });

                const data = await res.json();
                socket.emit("new message", data);
                setMessages((prevMessages) => [...prevMessages, data]);
            } catch (error) {
                console.error("Error sending message:", error);
                toast({
                    title: "//console.logsend message",
                    status: "error",
                    duration: 3000,
                    isClosable: true
                });
            }
        }
    };

    const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setNewMessage(target.value);
        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat?._id);
        }
        const lastTypingTime = new Date().getTime();
        const timerLength = 3000;
        setTimeout(() => {
            const timeNow = new Date().getTime();
            const timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat?._id);
                setTyping(false);
            }
        }, timerLength);
    };

    return (
        <div className='flex h-full'>
            {selectedChat ? (
                <div className='flex flex-col m-5 w-full'>
                    <div>
                        <FaArrowLeft onClick={handleBack} className='text-white md:hidden hover:cursor-pointer scale-90' />
                        {messages && selectedChat.isGroupChat && selectedChat.chatName ? (
                            <div className='flex flex-row justify-between'>
                                <div className='text-white w-fit px-3 py-1 rounded-xl bg-gradient-to-r from-purple-950 to-cyan-800 font-bold'>{selectedChat.chatName.toUpperCase()}</div>
                                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessage={fetchMessage} />
                            </div>
                        ) : (<>
                            {user && selectedChat && selectedChat.users && selectedChat.users.length > 0 &&
                                < div className='flex flex-row justify-between'>
                                    <div className='text-white w-fit px-3 py-1 rounded-xl bg-gradient-to-r from-purple-950 to-cyan-800 font-bold'>{getSender(user, selectedChat.users)}</div>
                                    <ProfileModal user={getSenderFull(user, selectedChat?.users) as UserType} />


                                </div>
                            }


                        </>
                        )}

                    </div>
                    <div className='text-white flex flex-grow overflow-y-scroll flex-col flex-end'>
                        {loading ? (
                            <Spinner size='xl' h={10} w={10} alignSelf='center' />
                        ) : (
                            <ScrollableChat messages={messages} />
                        )}
                    </div>
                    <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                        {isTyping ? <div>loading...</div> : <></>}
                        <Input
                            placeholder='Enter message'
                            onChange={typingHandler}
                            value={newMessage}
                            className='text-white'
                        />
                    </FormControl>
                </div>
            ) : (
                <div className='flex justify-center items-center w-full h-full text-xl text-white'>
                    Select User to get started with chat
                </div>
            )}
        </div>
    );
};

export default SingleChat;