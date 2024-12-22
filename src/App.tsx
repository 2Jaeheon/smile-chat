import React, {useState, useEffect} from "react";
import {useAuth} from "react-oidc-context";
import MessageList from "./components/MessageList";
import {getMessages} from "./api/api";

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
        if (newMessage.trim() !== "") {
            const newMsg = {
                messageId: `${Date.now()}`,
                content: newMessage,
                timestamp: new Date().toISOString(),
            };

            setMessages((prevMessages) => [...prevMessages, newMsg]);
            setNewMessage("");
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