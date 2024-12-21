import React from "react";
import {useAuth} from "react-oidc-context";

function App() {
    const auth = useAuth();

    const signOutRedirect = () => {
        const clientId = "4vn8p9ll3da0qq7k96lk67sapf";
        const logoutUri = "http://localhost:3000"; // 로그아웃 후 리다이렉트될 URI
        const cognitoDomain = "https://us-east-1ujnrl70cn.auth.us-east-1.amazoncognito.com";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
            <div>
                <h1>Welcome!</h1>
                <pre>Email: {auth.user?.profile.email || "No Email Available"}</pre>
                <pre>Name: {auth.user?.profile.name || "No Name Available"}</pre>
                <pre>ID Token: {auth.user?.id_token}</pre>
                <pre>Access Token: {auth.user?.access_token}</pre>
                <pre>Refresh Token: {auth.user?.refresh_token}</pre>

                <button onClick={() => auth.removeUser()}>Sign out (OIDC)</button>
                <button onClick={() => signOutRedirect()}>Sign out (Redirect)</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Login Required</h1>
            <button onClick={() => auth.signinRedirect()}>Sign in</button>
        </div>
    );
}

export default App;

/*
import React, {useState, useEffect, useContext} from 'react';
import MessageList from './components/MessageList';
import {getMessages} from './api/api';
import {AuthProvider, AuthContext, AuthContextProps} from 'react-oidc-context';

interface Message {
    messageId: string;
    content: string;
    timestamp: string;
}

// OIDC 설정
const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_uJNRL70cN",
    client_id: "4vn8p9ll3da0qq7k96lk67sapf",
    redirect_uri: "https://main.d1ysbm4jnf6x6r.amplifyapp.com",
    response_type: "code",
    scope: "email openid phone",
};


const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>(''); // 입력한 새로운 메시지 상태

    // `AuthContext` 가져오기
    const auth = useContext(AuthContext) as AuthContextProps;

    // 로그인 상태 확인
    const {user, isAuthenticated, isLoading} = auth;

    // 메시지 풀링: 로그인된 경우만 실행
    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchMessages = async () => {
            const data = await getMessages();
            setMessages(data);
        };

        // 첫 번째 로딩
        fetchMessages();

        // 60초마다 메시지를 가져옵니다.
        const interval = setInterval(fetchMessages, 60000);

        // 컴포넌트 언마운트 시 interval 정리
        return () => clearInterval(interval);
    }, [isAuthenticated]);

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

    // 로딩 상태 처리
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // 로그인되지 않은 경우
    if (!isAuthenticated) {
        return <div>Please log in to view messages.</div>;
    }

    // 로그인된 경우
    return (
        <div className="App">
            <h1>Real-time Chat</h1>
            <p>Welcome, {user?.profile.name || 'User'}!</p>
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

// Wrap the App with AuthProvider for OIDC
const RootApp: React.FC = () => (
    <AuthProvider {...cognitoAuthConfig}>
        <App/>
    </AuthProvider>
);

export default RootApp;*/
