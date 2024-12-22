import React, {useState} from 'react';
import '../styles/MessageInput.css';  // 스타일 파일을 불러옵니다。

interface MessageInputProps {
    newMessage: string;
    setNewMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSendMessage: (message: string) => void;  // 메시지 전송 로직을 props로 받음
    handleImageUpload: (file: File) => void; // 사진 업로드 처리 함수
}

const MessageInput: React.FC<MessageInputProps> = ({
                                                       newMessage,
                                                       setNewMessage,
                                                       handleSendMessage,
                                                       handleImageUpload
                                                   }) => {
    const [warning, setWarning] = useState<string>('');

    const handleClick = () => {
        if (newMessage.length > 100) {
            setWarning('메시지는 100자 이하로 작성해주세요.');
            return; // 100자 초과하면 전송되지 않도록 처리
        }
        handleSendMessage(newMessage); // 메시지 전송
        setNewMessage("");  // 입력창 초기화
        setWarning('');  // 경고 메시지 초기화
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            handleImageUpload(file); // 사진 업로드 처리
        }
    };

    return (
        <div className="message-input-container">
            <div className="message-input">
                {/* 경고 메시지가 있을 경우, 입력창 위에 표시 */}
                {warning && <p className="warning-message">{warning}</p>}
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message... (Max 100 characters)"
                    maxLength={100}  // 최대 100자까지 입력 제한
                />
                <button onClick={handleClick} disabled={newMessage.length > 100}>Send</button>

                {/* 사진 업로드 버튼 */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{marginTop: '10px'}}
                />
            </div>
        </div>
    );
};

export default MessageInput;