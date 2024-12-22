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

    // 유닉스 타임스탬프를 날짜 포맷으로 변환
    const formattedTimestamp = new Date(Number(message.timestamp) * 1000).toLocaleString();

    return (
        <div className="message-card">
            <div className="message-header">
                <strong className="message-id">{message.messageId}</strong>
            </div>
            <p className="message-content">{message.content}</p>
            <small className="message-timestamp">{formattedTimestamp}</small>
        </div>
    );
};

export default MessageCard;