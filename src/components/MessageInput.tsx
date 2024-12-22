import React, {useState} from 'react';
import '../styles/MessageInput.css';  // 스타일 파일을 불러옵니다.

interface MessageInputProps {
    newMessage: string;
    setNewMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSendMessage: (message: { text: string, imageUrl?: string }) => void;  // 메시지와 이미지 URL을 함께 전송
    uploadImage: (file: string, fileName: string, fileType: string) => Promise<any>;  // 이미지 업로드 함수
}

const MessageInput: React.FC<MessageInputProps> = ({newMessage, setNewMessage, handleSendMessage, uploadImage}) => {
    const [warning, setWarning] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined); // 타입을 string | undefined로 수정

    const handleClick = () => {
        // 메시지 전송 후 입력창 초기화
        if (newMessage.length > 100) {
            setWarning('메시지는 100자 이하로 작성해주세요.');
            return; // 100자 초과하면 전송되지 않도록 처리
        }

        // 메시지와 이미지 URL을 함께 전송
        handleSendMessage({text: newMessage, imageUrl});

        setNewMessage("");  // 입력창 초기화
        setWarning('');  // 경고 메시지 초기화
        setImageUrl(undefined); // 이미지 URL 초기화
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

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setImageFile(file);
        }
    };

    const handlePictureUpload = async () => {
        if (imageFile) {
            const fileReader = new FileReader();
            fileReader.onloadend = async () => {
                const base64File = fileReader.result as string;
                const fileName = imageFile.name;
                const fileType = imageFile.type;

                try {
                    const result = await uploadImage(base64File, fileName, fileType);
                    console.log('Image uploaded successfully:', result);
                    setImageUrl(result.imageUrl); // 업로드된 이미지 URL을 상태에 저장
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            };
            fileReader.readAsDataURL(imageFile);
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
                <button onClick={handleClick} disabled={newMessage.length > 100}>Send</button>

                {/* Picture 버튼 */}
                <button onClick={handlePictureUpload} disabled={!imageFile}>
                    Upload Picture
                </button>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{display: 'none'}}  // 파일 입력 창 숨김
                    id="fileInput"
                />
                <label htmlFor="fileInput" style={{cursor: 'pointer'}}>
                    Select Image
                </label>

                {/* 선택된 이미지 미리보기 */}
                {imageUrl && <img src={imageUrl} alt="Preview" width="100"/>}
            </div>
        </div>
    );
};

export default MessageInput;