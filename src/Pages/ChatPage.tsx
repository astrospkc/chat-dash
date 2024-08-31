import { useEffect, useState } from 'react'
import { BsSearch } from "react-icons/bs";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useDisclosure,

} from '@chakra-ui/react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react'
import { ChatState } from '@/context/ChatProvider';
import { useNavigate } from 'react-router-dom';
import SearchDrawer from '@/miscellaneous/SearchDrawer';
import MyChats from '@/components/MyChats';
import ChatBox from '@/components/ChatBox';
import { FaBell } from "react-icons/fa6";
// import { getSender } from '@/config/ChatLogic';
// import NotificationBadge from 'react-notification-badge';
// import { Effect } from 'react-notification-badge';




const ChatPage = () => {
    const { selectedChat } = ChatState()
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user, userInfo } = ChatState();
    const [fetchAgain, setFetchAgain] = useState<boolean>(false)
    useEffect(() => {
        userInfo()
    }, [])


    //console.log("user: ", user)
    return (
        <div className='h-screen'>
            {/* header */}
            {/* additional 2 boxes */}
            <div className='bg-gradient-to-r from-cyan-900 via-cyan-500 to-blue-900  flex flex-row justify-between p-4'>
                <div className=' flex flex-row gap-2 items-center'>
                    <BsSearch className='text-xl font-bold' />
                    <h1 className='text-base md:text-xl font-semibold'>


                        <SearchDrawer /> </h1></div>
                <div><h1 className='text-3xl font-bold'>CHAT-DASH</h1></div>
                <div className='text-base md:text-xl font-semibold flex flex-row  gap-2 items-center'>


                    <Menu>
                        <MenuButton>
                            {/* <NotificationBadge
                                count={notification.length}
                                effect={Effect.SCALE}
                            /> */}
                            <FaBell className='text-black' /></MenuButton>
                        {/* <MenuList>
                            {!notification.length && "no new messages"}
                            {notification.map((notif) => (
                                <MenuItem
                                    key={notif._id}
                                    onClick={() => {
                                        setSelectedChat(notif.chat);
                                        setNotification(notification.filter((n) => n != notif))
                                    }}
                                >
                                    {notif.chat.isGroupChat ? `New  message in ${notif.chat.chatName}` : `New message from ${getSender(user, notif.chat.users)}`}
                                </MenuItem>
                            ))}
                        </MenuList> */}
                        <MenuButton as={Button} >
                            Menu
                        </MenuButton>
                        <MenuList>
                            <MenuItem>
                                <Button onClick={onOpen}>My Profile</Button>
                                {user ?
                                    <Modal isOpen={isOpen} onClose={onClose}>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>{user.name}</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                <Avatar name={user.name} src={user.pic} />


                                            </ModalBody>
                                            <ModalBody>
                                                {user.email}
                                            </ModalBody>

                                            <ModalFooter>
                                                <Button colorScheme='blue' mr={3} onClick={onClose}>
                                                    Close
                                                </Button>

                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                    : <Modal isOpen={isOpen} onClose={onClose}>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>No profile to see</ModalHeader>
                                            <ModalCloseButton />


                                            <ModalFooter>
                                                <Button colorScheme='blue' mr={3} onClick={onClose}>
                                                    Close
                                                </Button>

                                            </ModalFooter>
                                        </ModalContent></Modal>

                                }





                            </MenuItem>
                            <MenuItem onClick={handleLogout}> LogOut</MenuItem>

                        </MenuList>
                    </Menu>
                </div>
            </div>
            <div className='bg-gray-900 flex flex-row  h-full'>

                <div className={`${selectedChat ? 'hidden' : 'block'} md:flex  w-full md:w-1/4 p-4 shadow-lg shadow-black`}>
                    <MyChats fetchAgain={fetchAgain} />
                </div>

                <div className={`${selectedChat ? "block" : "hidden"} md:${selectedChat && "block"} w-full h-full`}>
                    <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /></div>
            </div>
        </div>
    )
}

export default ChatPage
