// src/components/GroupList.js
import React from 'react';
import '../../css/GroupList.css';

const GroupList = ({ groups, setSelectedGroup }) => {
    return (
        <div className="group-list">
            <h2>Groups</h2>
            <ul>
                {groups.map((group) => (
                    <li key={group.id} onClick={() => setSelectedGroup(group)}>
                        {group.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroupList;
