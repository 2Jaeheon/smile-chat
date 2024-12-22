// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import {AuthProvider} from "react-oidc-context"; // AuthProviderProps로 타입 선언
import App from "./App";

const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_MLfnl7vto",
    client_id: "120khnbm0ba76or8nrvp06gvho",
    redirect_uri: "https://main.d1ysbm4jnf6x6r.amplifyapp.com",
    response_type: "code",
    scope: "phone openid email",
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