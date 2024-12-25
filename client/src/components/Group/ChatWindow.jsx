// src/components/ChatWindow.js
import React from 'react';
import '../../css/ChatWindow.css';

const ChatWindow = ({ selectedGroup }) => {
    if (!selectedGroup) {
        return <div className="chat-window">Select a group to start chatting!</div>;
    }

    return (
        <div className="chat-window">
            <h2>{selectedGroup.name}</h2>
            {/* Messages would be displayed here */}
            <div className="messages">
                {/* Sample message display */}
                <p>Message 1 from Group {selectedGroup.name}</p>
                <p>Message 2 from Group {selectedGroup.name}</p>
            </div>
            {/* Input for sending new messages could go here */}
        </div>
    );
};

export default ChatWindow;
