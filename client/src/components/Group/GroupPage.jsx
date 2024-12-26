import React, { useState } from 'react';
import GroupList from '../Group/GroupList';
import ChatWindow from '../Group/ChatWindow';
import '../../css/GroupPage.css';

const GroupPage = () => {
    const [selectedGroup, setSelectedGroup] = useState(null);

    // Sample groups data
    const groups = [
        { id: 1, name: 'Group A' },
        { id: 2, name: 'Group B' },
        { id: 3, name: 'Group C' },
    ];

    return (
        <div className="group-page-container">
            <GroupList groups={groups} setSelectedGroup={setSelectedGroup} />
            <ChatWindow selectedGroup={selectedGroup} />
        </div>
    );
};

export default GroupPage;
