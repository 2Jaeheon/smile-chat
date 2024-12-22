import React from 'react';
import '../styles/MessageInput.css'; // 스타일 파일을 불러옵니다.

interface MessageInputProps {
    newMessage: string;
    setNewMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSendMessage: () => void;
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
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default MessageInput;