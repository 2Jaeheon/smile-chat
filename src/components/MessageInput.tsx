import React from 'react';
import '../styles/MessageInput.css';  // 스타일 파일을 불러옵니다.

interface MessageInputProps {
    newMessage: string;
    setNewMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSendMessage: (message: string) => void;  // 메시지 전송 로직을 props로 받음
}

const MessageInput: React.FC<MessageInputProps> = ({newMessage, setNewMessage, handleSendMessage}) => {
    return (
        <div className="message-input-container">
            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={() => handleSendMessage(newMessage)}>Send</button>
            </div>
        </div>
    );
};

export default MessageInput;