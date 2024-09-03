import React from "react";
import "./loading.css";

const Loading: React.FC = () => {
    return (
        <div className="container loading-container">
            <svg viewBox="0 0 1320 300">
                <text x="50%" y="50%" dy=".35em" textAnchor="middle">
                    HEXAD
                </text>
            </svg>
        </div>
    );
};

export default Loading;
