import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import { ChatState } from '@/context/ChatProvider'
import { Divide } from 'lucide-react'
import UserListItem from '@/UsersList/UserListItem'
import UserBadge from '@/UsersList/UserBadge'
import debounce from '../miscellaneous/debounce'
const NewGroupModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUser, setSelectedUser] = useState([])
    // const [search, setSearch] = useState()
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)

    const { user, chats, setChats } = ChatState()

    const toast = useToast()


    const handleSearch = async (key) => {
        const token = localStorage.getItem("token")
        if (!key) {
            alert("please search user")
        } else {

            try {
                setLoading(true)
                const res = await fetch(`http://localhost:5000/api/users?search=${key}`, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })

                const data = await res.json()
                console.log("data when searched for group: ", data)
                setLoading(false)
                setSearchResult(data)
            } catch (error) {
                toast({
                    title: "Error fetching the chat",
                    position: 'bottom-left',
                    isClosable: true
                })
            }
        }

    }


    console.log("search Result: ", searchResult, "selectedUser: ", selectedUser)
    const handleSubmit = async () => {
        if (!groupChatName || !selectedUser) {
            toast({
                title: "Please fill all the fields",
                status: "warning",
                position: "top",
                isClosable: true
            })
            return
        }
        try {
            const token = localStorage.getItem("token")
            const res = await fetch("http://localhost:5000/api/chats/group/creategroup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    chatName: groupChatName,
                    users: JSON.stringify(selectedUser.map((u) => u._id))
                })
            })
            const data = await res.json()
            console.log("data: ", data)
            setChats([data, ...chats])
            onClose()
            toast({
                title: "Successfully created the group",
                status: "success",
                position: "top",
                isClosable: true
            })


        } catch (error) {
            toast({
                title: "Failed to create group",
                status: "error",
                position: "top",
                isClosable: true
            })

        }
    }
    const handleGroup = (userToAdd) => {
        if (selectedUser.includes(userToAdd)) {
            toast({
                title: "user already added",
                position: 'bottom-left',
                isClosable: true

            })
        }
        setSelectedUser([...selectedUser, userToAdd])
    }

    const handleDelete = (delUser) => {
        setSelectedUser(selectedUser.filter((user) => user._id != delUser._id))
    }

    const handleSearchChange = debounce((value) => {
        handleSearch(value)
    })


    const UpdateGroupChatName = debounce((value) => {
        setGroupChatName(value)
    })



    return (
        <div>
            <Button colorScheme='teal' variant='outline' onClick={onOpen}>New Group chat</Button>
            {/* <Button ml={4} ref={finalRef}>
                    I'll receive focus on close
                </Button> */}

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a new group</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>

                            <Input ref={initialRef} placeholder='Chat name' onChange={(e) => UpdateGroupChatName(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>

                            <Input placeholder='For eg: John, sai etc'
                                mb={1}
                                onChange={(e) => handleSearchChange(e.target.value)}
                            />
                        </FormControl>
                        <div className='flex flex-wrap gap-3'>
                            {
                                selectedUser?.map((u) => (
                                    <UserBadge key={u._id} user={u} handleFn={() => handleDelete(u)} />
                                ))
                            }
                        </div>

                        {
                            loading ? <div>Loading ... </div> : (
                                searchResult?.map(user => (
                                    <UserListItem
                                        key={user?._id}
                                        user={user}
                                        handleFn={() => handleGroup(user)}
                                    />
                                ))
                            )
                        }
                    </ModalBody>


                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Create Group
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default NewGroupModal
