const API_URL = 'https://ymamtrtb5e.execute-api.us-east-1.amazonaws.com/MessageAPI'; // 엔드포인트 URL
const API_KEY = process.env.REACT_APP_API_KEY;
const MESSAGE_SEND_API_URL = 'https://ymamtrtb5e.execute-api.us-east-1.amazonaws.com/MessageAPI/messages'; // 엔드포인트 URL


// GET 요청: 전체 메시지 불러오기
export const getMessages = async (): Promise<any[]> => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY || '', // API 키 헤더에 포함
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch. Status:', response.status, 'Message:', await response.text());
            throw new Error('Failed to fetch');
        }

        const responseBody = await response.json();
        const messages = JSON.parse(responseBody.body);
        return messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};


// POST 요청: 새로운 메시지 추가
export const addMessage = async (message: {
    messageId: string;
    timestamp: number;
    userId: string;
    content: string;
    sentiment: string;
}): Promise<any> => {
    try {
        const response = await fetch(MESSAGE_SEND_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY || '', // API 키 헤더에 포함
            },
            body: JSON.stringify(message), // 메시지 본문을 JSON으로 변환하여 전달
        });

        if (!response.ok) {
            console.error('Failed to add message. Status:', response.status, 'Message:', await response.text());
            throw new Error('Failed to add message');
        }

        const responseBody = await response.json();
        return responseBody;
    } catch (error) {
        console.error('Error adding message:', error);
        throw error;
    }
};

const UPLOAD_API_URL = 'https://ymamtrtb5e.execute-api.us-east-1.amazonaws.com/MessageAPI'; // 이미지 업로드를 위한 API 엔드포인트

export const uploadImageToS3 = async (file: File): Promise<string> => {
    // FormData 생성하여 파일을 전송
    const formData = new FormData();
    formData.append('file', file);  // 파일을 'file' 키로 추가

    try {
        const response = await fetch(UPLOAD_API_URL, {
            method: 'POST',
            body: formData,  // FormData로 파일을 전송
            headers: {
                'x-api-key': API_KEY || '', // API 키 포함
            },
        });

        if (!response.ok) {
            console.error('Failed to upload image. Status:', response.status, 'Message:', await response.text());
            throw new Error('Failed to upload image');
        }

        const data = await response.json();
        return data.imageUrl;  // S3에서 반환된 이미지 URL 반환
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};