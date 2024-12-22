import React from 'react';
import MessageCard from './MessageCard';
import '../styles/MessageList.css';

interface Message {
    messageId: string;
    content: string;
    timestamp: string;
}

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({messages}) => {
    // 최근 10개의 메시지만 표시
    const recentMessages = messages.slice(-6);

    return (
        <div className="message-list">
            {recentMessages.map((message) => (
                <MessageCard key={message.messageId} message={message}/>
            ))}
        </div>
    );
};

export default MessageList;