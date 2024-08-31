// import { ChatState } from '@/context/ChatProvider'

import SingleChat from './SingleChat'
interface ChatBoxProps {
    fetchAgain: boolean
    setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatBox: React.FC<ChatBoxProps> = ({ fetchAgain, setFetchAgain }) => {
    // const { selectedChat } = ChatState()
    return (
        <div className='${selectedChat ? "block" : "hidden"} md:${selectedChat && "block"} w-full h-full'>
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </div>

    )
}

export default ChatBox
