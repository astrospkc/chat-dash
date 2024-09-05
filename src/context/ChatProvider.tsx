import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatProviderProps, ChatContextType, chatType, UserType } from "../components/types/types"


const ChatContext = createContext<ChatContextType | undefined>(undefined)

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {


    const navigate = useNavigate();
    const [selectedChat, setSelectedChat] = useState<chatType>({
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
            pic: ""
        }
    });

    // const [selectedChat, setSelectedChat] = useState<chatType | "">("")
    const [user, setUser] = useState<UserType | undefined>(undefined);
    // const [notification, setNotification] = useState<notificationType>({});
    const [chats, setChats] = useState<chatType[]>([]);



    const userInfo = async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            alert('first login please, token is not generated')
            navigate("/")
        }
        const res = await fetch(`${import.meta.env.VITE_URL}/api/users/userInfo`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()

        ////console.log"userInfo: ", data)
        setUser(data)
    }





    return (
        <ChatContext.Provider value={{
            user,
            setUser,
            selectedChat,
            setSelectedChat,
            // notification, setNotification,
            chats, setChats, userInfo

        }}>
            {children}
        </ChatContext.Provider>
    )
}

const ChatState = () => {
    const context = useContext(ChatContext)
    if (context === undefined) {
        throw new Error("useChat must be used within a chatProvider")
    }
    return context
}
export { ChatProvider, ChatState } 