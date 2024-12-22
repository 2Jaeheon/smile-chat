import React from 'react';
import '../styles/MessageInput.css';  // 스타일 파일을 불러옵니다.

interface MessageInputProps {
    newMessage: string;
    setNewMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSendMessage: (message: string) => void;  // 메시지 전송 로직을 props로 받음
}

const MessageInput: React.FC<MessageInputProps> = ({newMessage, setNewMessage, handleSendMessage}) => {
    const handleClick = () => {
        // 메시지 전송 후 입력창 초기화
        handleSendMessage(newMessage);
        setNewMessage("");  // 입력창 초기화
    };

    return (
        <div className="message-input-container">
            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="button" onClick={handleClick}>Send</button>
                {/* type="button"으로 설정 */}
            </div>
        </div>
    );
};

export default MessageInput;