import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const ChatContext = createContext("")

const ChatProvider = ({ children }) => {
    const navigate = useNavigate();
    const [selectedChat, setSelectedChat] = useState();
    const [user, setUser] = useState();
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState([]);



    const userInfo = async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            alert('first login please, token is not generated')
            navigate("/")
        }
        const res = await fetch("http://localhost:5000/api/users/userInfo", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()

        console.log("userInfo: ", data)
        setUser(data)
    }





    return (
        <ChatContext.Provider value={{
            user,
            setUser,
            selectedChat,
            setSelectedChat,
            notification, setNotification,
            chats, setChats, userInfo

        }}>
            {children}
        </ChatContext.Provider>
    )
}

const ChatState = () => {
    return useContext(ChatContext)
}
export { ChatProvider, ChatState } 