import { UserType, MessageProps } from "../components/types/types"



export const getSender = (loggedUser: UserType, users: UserType[]) => {
    //console.log("loggedUser: ", loggedUser)
    //console.log("users: ", users)
    if (users && loggedUser) {
        return users[0]?._id === loggedUser._id ? users[1]?.name : users[0]?.name


    } else {
        return "no users found"
    }


}


export const getSenderFull = (loggedUser: UserType, users: UserType[]) => {
    //console.log("loggedUser: ", loggedUser)
    //console.log("users: ", users)
    if (users && loggedUser) {
        return users[0]?._id === loggedUser._id ? users[1] : users[0]


    } else {
        return "no users found"
    }


}

export const isSameSender = (messages: MessageProps[],
    m: MessageProps,
    i: number,
    userId: string) => {
    return (
        i < messages.length - 1 &&
        (messages[i + 1].sender._id !== m.sender._id ||
            messages[i + 1].sender._id === undefined) &&
        messages[i].sender._id !== userId
    );
}

export const isLastMessage = (messages: MessageProps[],

    i: number,
    userId: string) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    );
}

export const isSameSenderMargin = (messages: MessageProps[],
    m: MessageProps,
    i: number,
    userId: string) => {
    if (
        i < messages.length - 1 &&
        messages[i + 1].sender._id === m.sender._id &&
        messages[i].sender._id !== userId
    )
        return 33;
    else if (
        (i < messages.length - 1 &&
            messages[i + 1].sender._id !== m.sender._id &&
            messages[i].sender._id !== userId) ||
        (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
        return 0;
    else return "auto";
};

export const isSameUser = (messages: MessageProps[],
    m: MessageProps,
    i: number) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
}