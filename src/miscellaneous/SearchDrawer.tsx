import React, { useState } from 'react'
import {
    Drawer,
    DrawerBody,

    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Input,
    useToast,
    Spinner,
} from '@chakra-ui/react'
import { UserType } from "../components/types/types"


import ChatLoading from '@/components/ChatLoading'
import { ChatState } from '@/context/ChatProvider'
import UserListItem from '@/UsersList/UserListItem'

// interface SearchDrawerProps {
//     _id: string
//     setSelectedChat: (chat: chatType) => void
//     chats: chatType[]
//     setChats: (chats: chatType[]) => void
// }

const SearchDrawer = () => {
    const [search, setSearch] = useState("")
    const { chats, setChats, selectedChat } = ChatState()
    // searchresult, loading , loadingchat
    const [searchResult, setSearchResult] = useState<UserType[]>([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState(false)

    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef<HTMLButtonElement>(null)

    //console.log"selected chat in search drawer: ", selectedChat)

    const handleSearch = async () => {
        ////console.log"handling search")
        const token = localStorage.getItem("token")
        ////console.log"token in search drawer: ", token)
        if (!token) {
            alert("token is not available , please login")
        }
        if (!search) {
            toast({
                title: 'Please enter something to search',

                status: 'warning',
                duration: 9000,
                isClosable: true,
                position: 'top-left'
            })
            return
        }

        try {
            setLoading(true)

            const res = await fetch(`${import.meta.env.VITE_URL}/api/users?search=${search}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await res.json()
            ////console.log"data when searched: ", data)

            if (chats.length > 0 && !chats.find((chat) => chat._id === data._id)) setChats([...chats, data])
            // if (chats.length == 0 && data) setChats([data])



            setSearchResult(data)
            setLoading(false)



        } catch (error) {
            toast({
                title: 'failed to load the result in handleSearch',
                status: 'warning',
                duration: 9000,
                isClosable: true,
                position: 'bottom-left'
            })

            return

        }

    }
    ////console.log"chats while adding new chat: ", chats)


    const accessChats = async (userId: string) => {
        try {
            setLoadingChat(true)
            const token = localStorage.getItem("token")
            const res = await fetch(`${import.meta.env.VITE_URL}/api/chats`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId })
            })
            const data = await res.json()
            //console.log"user when selected from side drawer: ", data)
            // setSelectedChat(data)
            setChats([data, ...chats]) //experimentings
            //console.log"chts: ", chats)
            setLoadingChat(false)
            onClose()


        } catch (error) {
            toast({
                title: "Error fetching the chat",
                description: "error",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }

    return (
        <>
            <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                Search
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Search user</DrawerHeader>

                    <DrawerBody>
                        <Input placeholder='Search by name or email' value={search} onChange={(e) => setSearch(e.target.value)} />
                        <Button colorScheme='blue' onClick={handleSearch}>Go</Button>

                        {loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult?.map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFn={() => accessChats(user._id)}
                                />
                            ))
                        )}
                        {/* {loadingChat && <Spinner m="4px" d="flex" />} */}
                        {loadingChat && <Spinner m="4px" />}
                    </DrawerBody>


                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SearchDrawer
