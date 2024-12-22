import React from 'react';
import '../styles/MessageCard.css';

interface Message {
    messageId: string;
    content: string;
    timestamp: string;
    sentiment: string;  // 감정 상태 추가 (NEGATIVE, POSITIVE, NEUTRAL)
}

interface MessageCardProps {
    message: Message;
}

const MessageCard: React.FC<MessageCardProps> = ({message}) => {
    // 유닉스 타임스탬프를 날짜 포맷으로 변환
    const formattedTimestamp = new Date(Number(message.timestamp) * 1000).toLocaleString();

    // 감정에 따른 이모티콘 선택
    const getEmoji = (sentiment: string) => {
        switch (sentiment) {
            case 'POSITIVE':
                return '😊'; // 웃는 이모티콘
            case 'NEGATIVE':
                return '😡'; // 화난 이모티콘
            case 'NEUTRAL':
                return '😐'; // 평범한 이모티콘
            default:
                return '😶'; // 감정 없을 경우 기본 이모티콘
        }
    };

    return (
        <div className="message-card">
            <div className="message-header">
                <strong className="message-id">{message.messageId}</strong>
            </div>
            <p className="message-content">{message.content}</p>
            <small className="message-timestamp">{formattedTimestamp}</small>

            {/* 감정에 맞는 이모티콘 표시 */}
            <div className="emoji">{getEmoji(message.sentiment)}</div>
        </div>
    );
};

export default MessageCard;