import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    IconButton,
    Input,
    Spinner,
    useToast,
} from '@chakra-ui/react'
import { BsLayoutThreeColumns } from 'react-icons/bs'
import { ViewIcon } from 'lucide-react'
import { FaEye } from "react-icons/fa";
import { ChatState } from '@/context/ChatProvider';
import UserBadge from '@/UsersList/UserBadge';
import UserListItem from '@/UsersList/UserListItem';
import { group } from 'console';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const [groupChatName, setGroupChatName] = useState("")
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [renameLoading, setRenameLoading] = useState(false)
    const { selectedChat, user, setSelectedChat } = ChatState()
    console.log("selectedChat in updategroupchatmodel: ", selectedChat)
    const groupName = selectedChat?.chatName.toUpperCase()

    const handleRemove = async (user1) => {
        console.log("user1 to remove: ", user1)
        if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
            toast({
                title: "Only admins can remove someone",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"

            })
            return
        }
        try {
            setLoading(true)
            const token = localStorage.getItem("token")
            const res = await fetch("http://localhost:5000/api/chats/group/removeMember", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    chatId: selectedChat._id,
                    userId: user1._id
                })
            })
            const data = await res.json()
            if (user1._id === user._id) {
                setSelectedChat("")
            } else {
                setSelectedChat(data)
            }

            setFetchAgain(!fetchAgain)
            fetchMessages()
            setLoading(false)
        } catch (error) {

            toast({
                title: "Error Occured while leaving group",

                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-left"
            })
            setLoading(false)

        }
        setGroupChatName("")
    }

    const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            toast({
                title: "User already in group",
                status: "error",
                isClosable: true,
                position: "top"
            })
            return;
        }

        if (selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: "only admins can add someone",
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }
        try {
            setLoading(true)
            const token = localStorage.getItem("token")
            const res = await fetch("http://localhost:5000/api/chats/group/addMember", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    chatId: selectedChat._id,
                    userId: user1._id
                })
            })
            const data = await res.json()
            console.log("data when adding: ", data)
            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setLoading(false)
        } catch (error) {
            toast({
                title: "error occured while adding user",
                status: "error",
                duration: 3000,
                isClosable: true
            })
            setLoading(false)
        }
        setGroupChatName("")
    }

    const handleRename = async () => {
        if (!groupChatName) return;
        try {
            setRenameLoading(true)
            const token = localStorage.getItem("token")
            const res = await fetch("http://localhost:5000/api/chats/group/renamegroup", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    chatId: selectedChat._id,
                    chatName: groupChatName
                })
            })
            const data = await res.json();
            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setRenameLoading(false)
        } catch (error) {
            toast({
                title: "error occurred while renaming the group",
                status: "error",
                duration: 3000,
                isClosable: true
            })
            setRenameLoading(false)
        }
        setGroupChatName("")
    }

    const handleSearch = async (value) => {
        console.log("value: ", value)
        setSearch(value)
        if (!value) {
            return;
        }
        try {
            setLoading(true)
            const token = localStorage.getItem("token")
            const res = await fetch(`http://localhost:5000/api/users?search=${value}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
            const data = await res.json()
            setLoading(false)
            setSearchResult(data)

        } catch (error) {
            toast({
                title: "error occurred while searching",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
        }
    }
    console.log("searcch result in update group modal: ", searchResult)


    return (
        <>
            <div>


                <FaEye className='text-3xl text-white hover:cursor-pointer' onClick={onOpen} />

                <Modal
                    isCentered
                    onClose={onClose}
                    isOpen={isOpen}
                    motionPreset='slideInBottom'>
                    <ModalOverlay bg='blackAlpha.300'
                        backdropFilter='blur(10px) hue-rotate(90deg)' />
                    <ModalContent>
                        <ModalHeader>{groupName}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <div className='flex flex-col gap-2'>

                                <div className='flex flex-row gap-2'>
                                    {selectedChat?.users.map((u) => {
                                        return (
                                            <UserBadge
                                                key={u._id}
                                                user={u}
                                                handleFn={() => handleRemove(u)}
                                            />
                                        )



                                    })}
                                </div>
                                <div className='flex flex-row gap-2'>

                                    <Input placeholder='rename group name' value={groupChatName} onChange={(e) => setGroupChatName(e.target.value)} />
                                    <Button isLoading={renameLoading} onClick={handleRename}>Rename</Button>
                                </div>
                                <div>
                                    <Input placeholder='Add users' onChange={(e) => handleSearch(e.target.value)} />
                                </div>
                                {
                                    loading ? (
                                        <Spinner size="lg" />
                                    ) : (
                                        searchResult?.map((user) => (
                                            <UserListItem
                                                key={user._id}
                                                user={user}
                                                handleFn={() => handleAddUser(user)}
                                            />
                                        ))
                                    )
                                }
                            </div>


                        </ModalBody>


                        <ModalFooter>
                            <Button colorScheme='red' mr={3} onClick={() => handleRemove(user)}>
                                Leave Group
                            </Button>

                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </>
    )
}

export default UpdateGroupChatModal
