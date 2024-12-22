import React, {useState} from 'react';
import {uploadImageToS3} from '../api/api'; // S3 업로드 함수를 임포트합니다.
import '../styles/MessageInput.css';  // 스타일 파일을 불러옵니다.

interface MessageInputProps {
    newMessage: string;
    setNewMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSendMessage: (message: string, imageUrl?: string) => void;  // 메시지 전송 로직을 props로 받음
}

const MessageInput: React.FC<MessageInputProps> = ({newMessage, setNewMessage, handleSendMessage}) => {
    const [warning, setWarning] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);  // 파일 상태

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImageFile(file);  // 선택한 파일을 상태에 저장
        }
    };

    const handleClick = async () => {
        // 메시지 전송 후 입력창 초기화
        if (newMessage.length > 100) {
            setWarning('메시지는 100자 이하로 작성해주세요.');
            return; // 100자 초과하면 전송되지 않도록 처리
        }

        let imageUrl = '';
        if (imageFile) {
            try {
                // 이미지 파일이 있으면 업로드 후 URL을 받아옵니다.
                imageUrl = await uploadImageToS3(imageFile);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        // 메시지 전송
        handleSendMessage(newMessage, imageUrl);  // 이미지 URL을 메시지와 함께 전달
        setNewMessage("");  // 입력창 초기화
        setImageFile(null);  // 이미지 파일 상태 초기화
        setWarning('');  // 경고 메시지 초기화
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        setNewMessage(newText);
        // 100자 초과하면 경고 메시지 표시
        if (newText.length > 100) {
            setWarning('메시지는 100자 이하로 작성해주세요.');
        } else {
            setWarning('');
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
                    onChange={handleChange}
                    placeholder="Type your message... (Max 100 characters)"
                    maxLength={100}  // 최대 100자까지 입력 제한
                />
                <input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    onChange={handleFileChange}
                />
                <button onClick={handleClick} disabled={newMessage.length > 100}>Send</button>
            </div>
        </div>
    );
};

export default MessageInput;