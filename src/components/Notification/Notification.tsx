import React from 'react';

interface NotificationProps {
    message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
        </div>
    );
};

export default Notification;