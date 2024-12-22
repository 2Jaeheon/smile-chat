import React, {useState} from 'react';
import '../styles/MessageInput.css';  // 스타일 파일을 불러옵니다.

interface MessageInputProps {
    newMessage: string;
    setNewMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSendMessage: (message: string) => void;  // 메시지 전송 로직을 props로 받음
}

const MessageInput: React.FC<MessageInputProps> = ({newMessage, setNewMessage, handleSendMessage}) => {
    const [toastVisible, setToastVisible] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');

    const handleClick = () => {
        // 메시지 전송 후 입력창 초기화
        if (newMessage.length > 100) {
            setToastMessage('메시지는 100자 이하로 작성해주세요.');
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 3000); // 3초 후 토스트 숨김
            return; // 100자 초과하면 전송되지 않도록 처리
        }
        handleSendMessage(newMessage);
        setNewMessage("");  // 입력창 초기화
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        setNewMessage(newText);
    };

    return (
        <div className="message-input-container">
            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={handleChange}
                    placeholder="Type your message... (Max 100 characters)"
                    maxLength={100}  // 최대 100자까지 입력 제한
                />
                <button onClick={handleClick} disabled={newMessage.length > 100}>Send</button>
            </div>

            {/* 토스트 알림 표시 */}
            {toastVisible && (
                <div className="toast">
                    {toastMessage}
                </div>
            )}
        </div>
    );
};

export default MessageInput;