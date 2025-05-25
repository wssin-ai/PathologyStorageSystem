import React from 'react';
import { ProcessedItem } from '../../types';
import StatCard from '../StatCard/StatCard';

interface StatisticsPanelProps {
    items: ProcessedItem[];
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ items }) => {
    if (items.length === 0) return null;

    const totalItems = items.length;
    const storedItems = items.filter(item => item.status === 'stored').length;
    const disposedItems = items.filter(item => item.status === 'disposed').length;

    return (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
                title="총 처리 건수"
                value={totalItems}
                bgColor="bg-blue-100"
                textColor="text-blue-800"
                valueColor="text-blue-900"
            />
            <StatCard
                title="보관중 검체"
                value={storedItems}
                bgColor="bg-green-100"
                textColor="text-green-800"
                valueColor="text-green-900"
            />
            <StatCard
                title="폐기된 검체"
                value={disposedItems}
                bgColor="bg-red-100"
                textColor="text-red-800"
                valueColor="text-red-900"
            />
        </div>
    );
};

export default StatisticsPanel;