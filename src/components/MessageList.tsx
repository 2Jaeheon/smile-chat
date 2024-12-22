import React, {useState, useEffect} from 'react';
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
    const [itemsToShow, setItemsToShow] = useState(6);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsToShow(5); // 모바일 화면에서는 5개
            } else {
                setItemsToShow(6); // PC 화면에서는 6개
            }
        };

        // 처음 렌더링 시와 창 크기 변경 시 이벤트 처리
        handleResize();
        window.addEventListener('resize', handleResize);

        // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 최근 6개의 메시지 또는 화면 크기에 맞게 메시지 수 설정
    const recentMessages = messages.slice(-itemsToShow);

    return (
        <div className="message-list">
            {recentMessages.map((message) => (
                <MessageCard key={message.messageId} message={message}/>
            ))}
        </div>
    );
};

export default MessageList;