import React, {useState, useEffect} from "react";
import {useAuth} from "react-oidc-context";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput"; // MessageInput 컴포넌트 추가
import {getMessages} from "./api/api"; // addMessage를 여기서 호출하지 않음
import LoadingSpinner from "./components/LoadingSpinner"; // 로딩 스피너 추가
import "./styles/WelcomePage.css"; // WelcomePage 스타일 추가
import "./styles/AuthenticatedPage.css";

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
    const handleSendMessage = async (newMessage: string) => {
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
                // 메시지 전송 후 최신 메시지 목록을 다시 가져오기
                const response = await fetch('https://ymamtrtb5e.execute-api.us-east-1.amazonaws.com/MessageAPI/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': process.env.REACT_APP_API_KEY || '', // API 키 헤더에 포함
                    },
                    body: JSON.stringify(newMsg),
                });

                if (response.ok) {
                    // 메시지 전송 후 최신 메시지 목록을 다시 가져오기
                    const updatedMessages = await getMessages();
                    setMessages(updatedMessages);  // 메시지 갱신
                } else {
                    console.error('Error adding message:', await response.text());
                }
            } catch (error) {
                console.error("Error adding message:", error);
            }
        }
    };

    if (auth.isLoading) {
        return <LoadingSpinner/>;
    }

    if (auth.error) {
        return <div>Error: {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
            <div>
                <div className="authenticated-container">
                    <div className="header">
                        <h1>
                            Welcome to <span>Smile-Chat</span>!
                        </h1>
                        <p className="user-info">
                            Logged in as: <strong>{auth.user?.profile.email || "No Email Available"}</strong>
                        </p>
                        <button className="signout-button" onClick={() => signOutRedirect()}>
                            Sign Out
                        </button>
                    </div>
                    <div className="chat-section">
                        <MessageList messages={messages}/>

                        <MessageInput
                            newMessage={newMessage}
                            setNewMessage={setNewMessage}
                            handleSendMessage={handleSendMessage}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="welcome-container">
            <div className="welcome-content">
                <h1>
                    Welcome to <br/><span>Smile-Chat</span>!
                </h1>
                <p>Join our platform</p>
                <button className="welcome-button" onClick={() => auth.signinRedirect()}>
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default App;