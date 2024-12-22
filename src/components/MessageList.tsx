import React, {useEffect, useRef} from 'react';
import MessageCard from './MessageCard';
import '../styles/MessageList.css';

interface Message {
    messageId: string;
    content: string;
    timestamp: string;
    sentiment: string;
}

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({messages}) => {
    const messageListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageListRef.current) {
            // 페이지 로딩 후 맨 아래로 스크롤
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="message-list" ref={messageListRef}>
            {messages.map((message) => (
                <MessageCard key={message.messageId} message={message}/>
            ))}
        </div>
    );
};

export default MessageList;