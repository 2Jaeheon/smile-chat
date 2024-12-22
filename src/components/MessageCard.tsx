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
            {/* messageId와 content를 함께 표시 */}
            <p>
                <strong>{message.messageId}</strong>: {message.content}
            </p>
            <small>{new Date(message.timestamp).toLocaleString()}</small>
        </div>
    );
};

export default MessageCard;