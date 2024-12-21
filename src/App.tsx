import React, {useState, useEffect} from 'react';
import {useAuth} from 'react-oidc-context'; // Cognito 인증을 위한 useAuth 훅을 가져옴
import MessageList from './components/MessageList';
import {getMessages} from './api/api';

interface Message {
    messageId: string;
    content: string;
    timestamp: string;
}

const App: React.FC = () => {
    const {isAuthenticated, user, signinRedirect, signoutRedirect, isLoading, error} = useAuth(); // 인증 관련 메서드 사용
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>(''); // 입력한 새로운 메시지 상태

    // 메시지 풀링: 15초마다 API 호출
    useEffect(() => {
        if (isAuthenticated) {
            const fetchMessages = async () => {
                const data = await getMessages();
                setMessages(data);
            };

            fetchMessages();

            const interval = setInterval(fetchMessages, 15000);
            return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
        }
    }, [isAuthenticated]);

    // 메시지 전송 함수
    const handleSendMessage = async () => {
        if (newMessage.trim() !== '') {
            const newMsg = {
                messageId: `${Date.now()}`, // 메시지 ID를 타임스탬프로 생성
                content: newMessage,
                timestamp: new Date().toISOString(),
            };

            setMessages((prevMessages) => [...prevMessages, newMsg]);
            setNewMessage(''); // 메시지 전송 후 입력창 비우기
        }
    };

    // 로그인 상태가 로딩 중일 경우
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // 인증 오류 처리
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // 로그인된 경우
    if (isAuthenticated) {
        return (
            <div className="App">
                <h1>Welcome, {user?.profile?.email}</h1> {/* 로그인된 사용자 이메일 표시 */}
                <MessageList messages={messages}/>

                <div>
          <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Enter your message..."
          />
                    <button onClick={handleSendMessage}>Send Message</button>
                </div>

                <button onClick={() => signoutRedirect()}>Log out</button>
                {/* 로그아웃 처리 */}
            </div>
        );
    }

    // 로그인되지 않은 경우
    return (
        <div className="App">
            <h1>Real-time Chat</h1>
            <button onClick={() => signinRedirect()}>Log in</button>
            {/* 로그인 처리 */}
        </div>
    );
};

export default App;