import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthProvider} from "react-oidc-context";

const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_GiMEcaGt4",
    client_id: "4i5aodon6970pe8e51n9ptokde",
    redirect_uri: "https://main.d1iozj3igvpaxt.amplifyapp.com",
    response_type: "code",
    scope: "phone openid email",
};

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

// wrap the application with AuthProvider
root.render(
    <React.StrictMode>
        <AuthProvider {...cognitoAuthConfig}>
            <App/>
        </AuthProvider>
    </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
