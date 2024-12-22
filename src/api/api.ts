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


// POST 요청: 이미지 업로드
export const uploadImage = async (file: string, fileName: string, fileType: string): Promise<any> => {
    try {
        // 전송할 데이터 준비
        const requestBody = {
            file,
            fileName,
            fileType,
        };

        // API에 POST 요청 보내기
        const response = await fetch(UPLOAD_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.REACT_APP_API_KEY || '', // API 키 헤더에 포함
            },
            body: JSON.stringify(requestBody), // Base64로 인코딩된 파일과 메타데이터를 전달
        });

        if (!response.ok) {
            console.error('Failed to upload image. Status:', response.status, 'Message:', await response.text());
            throw new Error('Failed to upload image');
        }

        // 응답 본문을 JSON으로 파싱
        const responseBody = await response.json();
        return responseBody;  // 이미지 URL 등을 포함한 응답 데이터 반환
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};