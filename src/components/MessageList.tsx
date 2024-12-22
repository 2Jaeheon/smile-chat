import React, {useEffect, useRef} from 'react';
import MessageCard from './MessageCard';
import '../styles/MessageList.css';

interface Message {
    messageId: string;
    content: string;
    timestamp: string;
    sentiment: string;
    imageUrl?: string;  // 메시지와 함께 이미지 URL도 포함
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

    // 메시지를 timestamp 기준으로 내림차순 정렬
    const sortedMessages = [...messages].sort((a, b) => {
        return Number(a.timestamp) - Number(b.timestamp); // 오름차순으로 정렬
    });

    return (
        <div className="message-list" ref={messageListRef}>
            {sortedMessages.map((message) => (
                <MessageCard key={message.messageId} message={message}/>
            ))}
        </div>
    );
};

export default MessageList;