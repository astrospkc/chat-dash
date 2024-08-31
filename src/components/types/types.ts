export interface UserType {
    _id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    pic: string;

}
export interface chatType {
    _id: string | "";
    chatName: string | "";
    isGroupChat: boolean | false;
    users: UserType[];
    latestMessage: string | "";
    groupAdmin: UserType;
}
export interface notificationType {
    [key: string]: any;
}


export interface ChatContextType {
    user: UserType | undefined;
    setUser: (user: UserType) => void;
    selectedChat: chatType | null;
    setSelectedChat: (chat: chatType) => void;
    // notification: notificationType;
    // setNotification: (notification: notificationType) => void;
    chats: chatType[];
    setChats: (chats: chatType[]) => void;
    userInfo: () => Promise<void>;
}
export interface ChatProviderProps {
    children: React.ReactNode
}

export interface MessageProps {
    _id: string;
    sender: UserType;
    content: string;
    chat: chatType
}
