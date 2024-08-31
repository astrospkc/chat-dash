import { UserType } from '@/components/types/types';
import { Avatar, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';

import { FaEye } from "react-icons/fa";

interface ModalProps {
    user: UserType
}


const ProfileModal = ({ user }: ModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    // const handleClick = () => {

    // }

    return (
        <div className=''>

            <FaEye onClick={onOpen} className='text-3xl text-white' />
            {user &&
                <Modal isOpen={isOpen} onClose={onClose} >
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
            }
        </div>
    )
}

export default ProfileModal


