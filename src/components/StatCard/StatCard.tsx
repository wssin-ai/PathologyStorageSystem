import React from 'react';

interface StatCardProps {
    title: string;
    value: number;
    bgColor: string;
    textColor: string;
    valueColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
                                               title,
                                               value,
                                               bgColor,
                                               textColor,
                                               valueColor
                                           }) => {
    return (
        <div className={`${bgColor} p-4 rounded-lg`}>
            <h3 className={`font-semibold ${textColor}`}>{title}</h3>
            <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
        </div>
    );
};

export default StatCard;
