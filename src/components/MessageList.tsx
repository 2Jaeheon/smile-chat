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
    return (
        <div className="message-list">
            {messages.map((message) => (
                <MessageCard key={message.messageId} message={message}/>
            ))}
        </div>
    );
};

export default MessageList;