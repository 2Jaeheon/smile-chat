// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import {AuthProvider, AuthProviderProps} from "react-oidc-context"; // AuthProviderProps로 타입 선언
import App from "./App";

const cognitoAuthConfig: AuthProviderProps = {
    authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_GiMEcaGt4", // Cognito 권한 엔드포인트
    client_id: "4i5aodon6970pe8e51n9ptokde", // Cognito 앱 클라이언트 ID
    redirect_uri: "https://main.d1iozj3igvpaxt.amplifyapp.com", // 리다이렉트 URI
    response_type: "code", // 응답 타입
    scope: "email openid phone", // 요청하는 스코프
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// wrap the application with AuthProvider
root.render(
    <React.StrictMode>
        <AuthProvider {...cognitoAuthConfig}>
            <App/>
        </AuthProvider>
    </React.StrictMode>
);