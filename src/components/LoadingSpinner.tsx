import React from "react";
import "../styles/LoadingSpinner.css"; // 스타일 추가

const LoadingSpinner: React.FC = () => {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
            <p>Loading, please wait...</p>
        </div>
    );
};

export default LoadingSpinner;