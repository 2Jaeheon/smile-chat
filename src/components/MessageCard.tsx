import React from 'react';
import '../styles/MessageCard.css';

interface Message {
    messageId: string;
    content: string;
    timestamp: string;
}

interface MessageCardProps {
    message: Message;
}

const MessageCard: React.FC<MessageCardProps> = ({message}) => {
    return (
        <div className="message-card">
            <p>{message.content}</p>
            <small>{new Date(message.timestamp).toLocaleString()}</small>
        </div>
    );
};

export default MessageCard;