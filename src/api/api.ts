const API_URL = 'https://ymamtrtb5e.execute-api.us-east-1.amazonaws.com/MessageAPI'; // 엔드포인트 URL
const API_KEY = process.env.REACT_APP_API_KEY;
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
            // 응답 상태 코드와 메시지 출력
            console.error('Failed to fetch. Status:', response.status, 'Message:', await response.text());
            throw new Error('Failed to fetch');
        }

        // 응답 본문을 JSON으로 파싱 (body는 문자열로 감싸져 있으므로 이를 파싱)
        const responseBody = await response.json();

        // body 안의 문자열을 다시 JSON으로 파싱
        const messages = JSON.parse(responseBody.body);

        return messages;
    } catch (error) {
        // 네트워크 오류 등의 문제에 대한 에러 처리
        console.error('Error fetching messages:', error);
        throw error;
    }
};