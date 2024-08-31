// import { MessageProps } from '@/components/types/types'
import { MessageProps } from '@/components/types/types'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '@/config/ChatLogic'
import { ChatState } from '@/context/ChatProvider'
import { Tooltip } from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react'

import ScrollableFeed from "react-scrollable-feed"

interface ScrollableChatProps {
    messages: MessageProps[]
}

const ScrollableChat = ({ messages }: ScrollableChatProps) => {
    const { user } = ChatState()

    const userId = user ? user._id : ""
    return (
        <ScrollableFeed>
            {
                messages && messages.map((m, i) => (
                    <div className='flex ' key={m._id}>
                        {
                            (isSameSender(messages, m, i, userId) || isLastMessage(messages, i, userId)) && (
                                <Tooltip label={m.sender.name} placement='bottom-start' hasArrow>
                                    <Avatar
                                        mt="7px"
                                        mr={1}
                                        size="sm"
                                        cursor="pointer"
                                        name={m.sender.name}
                                        src={m.sender.pic}
                                    />
                                </Tooltip>
                            )
                        }
                        <span
                            className='text-black w-fit rounded-2xl p-3 my-2 '
                            style={{
                                backgroundColor: `${m.sender._id === userId ? '#BEE3F8' : '#B9F5D0'}`,
                                marginLeft: isSameSenderMargin(messages, m, i, userId),
                                marginTop: isSameUser(messages, m, i) ? 3 : 10,

                            }}
                        >
                            {m.content}

                        </span>
                    </div>
                ))
            }
        </ScrollableFeed>
    )
}

export default ScrollableChat
