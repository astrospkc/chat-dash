export const getSender = (loggedUser, users) => {
    console.log("loggedUser: ", loggedUser)
    console.log("users: ", users)
    if (users && loggedUser) {
        return users[0]?._id === loggedUser._id ? users[1]?.name : users[0]?.name


    } else if (users && !loggedUser) {
        return users[0]?.name + users[1]?.name
    } else {
        return "no users found"
    }


}


export const getSenderFull = (loggedUser, users) => {
    console.log("loggedUser: ", loggedUser)
    console.log("users: ", users)
    if (users && loggedUser) {
        return users[0]?._id === loggedUser._id ? users[1] : users[0]


    } else {
        return "no users found"
    }


}