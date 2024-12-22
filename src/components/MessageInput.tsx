import React, {useState} from 'react';
import '../styles/MessageInput.css';  // 스타일 파일을 불러옵니다.

interface MessageInputProps {
    newMessage: string;
    setNewMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSendMessage: (message: { text: string, imageUrl?: string }) => void;  // 메시지와 이미지 URL을 함께 전송
    uploadImage: (file: string, fileName: string, fileType: string) => Promise<any>;  // 이미지 업로드 함수
    setImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;  // 이미지 URL을 상태로 설정
}

const MessageInput: React.FC<MessageInputProps> = ({
                                                       newMessage,
                                                       setNewMessage,
                                                       handleSendMessage,
                                                       uploadImage,
                                                       setImageUrl
                                                   }) => {
    const [warning, setWarning] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);  // 업로드 중 상태 관리

    const handleClick = async () => {
        // 메시지 전송 후 입력창 초기화
        if (newMessage.length > 100) {
            setWarning('메시지는 100자 이하로 작성해주세요.');
            return; // 100자 초과하면 전송되지 않도록 처리
        }

        setIsUploading(true); // 업로드 시작

        let imageUrl;
        if (imageFile) {
            try {
                // 이미지 업로드
                const result = await uploadImage(URL.createObjectURL(imageFile), imageFile.name, imageFile.type);
                imageUrl = result.imageUrl;  // 업로드된 이미지 URL
                setImageUrl(imageUrl); // 이미지 URL 상태에 저장
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        // 메시지 전송
        handleSendMessage({text: newMessage, imageUrl});

        setNewMessage("");  // 입력창 초기화
        setWarning('');  // 경고 메시지 초기화
        setIsUploading(false);  // 업로드 완료
        setImageFile(null); // 이미지 파일 초기화 (업로드 후)

        // 파일 선택 초기화
        const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
        if (fileInput) {
            fileInput.value = ''; // 파일 입력창 초기화
        }
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
                <button onClick={handleClick} disabled={newMessage.length > 100 || isUploading}>
                    {isUploading ? 'Uploading...' : 'Send'}
                </button>
            </div>

            {/* 파일 선택 부분 (절대 위치로 위치 지정) */}
            <div className="file-input-container">
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

                {/* 선택된 파일 이름 또는 선택되지 않은 경우 안내 메시지 표시 */}
                {imageFile ? (
                    <p>{imageFile.name}</p>  // 선택된 파일 이름 표시
                ) : (
                    <p>No file selected</p>  // 파일이 선택되지 않았으면 안내 문구 표시
                )}
            </div>
        </div>
    );
};

export default MessageInput;