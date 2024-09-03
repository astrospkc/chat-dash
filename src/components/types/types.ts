export interface UserType {
    _id: string | null;
    name: string | null;
    username: string | null;
    email: string | null;
    password: string | null;
    pic: string | null;

}
export interface chatType {
    _id?: string | null;
    chatName?: string | null;
    isGroupChat?: boolean | false;
    users?: UserType[] | null;
    latestMessage?: string | null;
    groupAdmin?: UserType | null;
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
