import React, {useState, useEffect} from "react";
import {useAuth} from "react-oidc-context";
import MessageList from "./components/MessageList";
import {getMessages, addMessage} from "./api/api";  // addMessage 함수 추가

interface Message {
    messageId: string;
    content: string;
    timestamp: string;
}

const App: React.FC = () => {
    const auth = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");

    // 로그아웃 리다이렉트 함수
    const signOutRedirect = () => {
        const clientId = "120khnbm0ba76or8nrvp06gvho";
        const logoutUri = "https://main.d1ysbm4jnf6x6r.amplifyapp.com"; // 로그아웃 후 리다이렉트될 URI
        const cognitoDomain = "https://us-east-1mlfnl7vto.auth.us-east-1.amazoncognito.com";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

    // 메시지 데이터 가져오기
    useEffect(() => {
        if (auth.isAuthenticated) {
            const fetchMessages = async () => {
                const data = await getMessages();
                setMessages(data);
            };

            fetchMessages();

            const interval = setInterval(fetchMessages, 100000); // 100초마다 메시지 갱신
            return () => clearInterval(interval);
        }
    }, [auth.isAuthenticated]);

    // 메시지 전송 함수
    const handleSendMessage = async () => {
        const emailPrefix = auth.user?.profile.email?.split('@')[0];  // 이메일에서 @ 앞부분만 추출

        if (newMessage.trim() !== "") {
            const newMsg = {
                messageId: emailPrefix || `${Date.now()}`,  // 이메일이 없을 경우 타임스탬프 사용
                timestamp: Math.floor(Date.now() / 1000), // 초 단위 유닉스 타임스탬프
                content: newMessage,
                sentiment: "", // 예시 sentiment
                userId: auth.user?.profile.email || "unknown", // 사용자 ID를 이메일로 사용
            };

            try {
                await addMessage(newMsg);  // addMessage 함수 호출하여 메시지 추가
                setNewMessage("");  // 메시지 전송 후 입력창 비우기

                // 메시지 전송 후 최신 메시지 목록을 다시 가져오기
                const updatedMessages = await getMessages();
                setMessages(updatedMessages);  // 메시지 갱신
            } catch (error) {
                console.error("Error adding message:", error);
            }
        }
    };

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Error: {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
            <div>
                <h1>Welcome!</h1>
                <pre>Email: {auth.user?.profile.email || "No Email Available"}</pre>
                <pre>ID Token: {auth.user?.id_token}</pre>

                <pre>Access Token: {auth.user?.access_token}</pre>
                <pre>Refresh Token: {auth.user?.refresh_token}</pre>

                <button onClick={() => auth.removeUser()}>Sign out (OIDC)</button>
                <button onClick={signOutRedirect}>Sign out (Redirect)</button>

                <div className="Chat">
                    <h2>Real-time Chat</h2>
                    <MessageList messages={messages}/>
                    <div>
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Enter your message..."
                        />
                        <button onClick={handleSendMessage}>Send Message</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1>Login Required</h1>
            <button onClick={() => auth.signinRedirect()}>Sign in</button>
        </div>
    );
};

export default App;