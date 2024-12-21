import React, {useState, useEffect} from 'react';
import MessageList from './components/MessageList';
import {getMessages} from './api/api';

interface Message {
    messageId: string;
    content: string;
    timestamp: string;
}

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>(''); // 입력한 새로운 메시지 상태

    // 메시지 풀링: 15초마다 API 호출
    useEffect(() => {
        const fetchMessages = async () => {
            const data = await getMessages();
            setMessages(data);
        };

        // 첫 번째 로딩
        fetchMessages();

        // 60초마다 메시지를 가져옵니다.
        const interval = setInterval(fetchMessages, 100000);
        //const interval = setInterval(fetchMessages, 6000000000000000000);
        // 컴포넌트 언마운트 시 interval 정리
        return () => clearInterval(interval);
    }, []);

    // 메시지 전송 함수
    const handleSendMessage = async () => {
        if (newMessage.trim() !== '') {
            const newMsg = {
                messageId: `${Date.now()}`, // 메시지 ID를 타임스탬프로 생성
                content: newMessage,
                timestamp: new Date().toISOString(),
            };

            // 새로운 메시지를 리스트에 추가 (API 호출을 통해 실제 서버에 메시지를 전송할 수 있음)
            setMessages((prevMessages) => [...prevMessages, newMsg]);

            // 메시지 전송 후 입력창 비우기
            setNewMessage('');
        }
    };

    return (
        <div className="App">
            <h1>Real-time Chat</h1>
            <MessageList messages={messages}/>

            <div>
        <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)} // 메시지 입력시 상태 업데이트
            placeholder="Enter your message..."
        />
                <button onClick={handleSendMessage}>Send Message</button>
            </div>
        </div>
    );
};

export default App;