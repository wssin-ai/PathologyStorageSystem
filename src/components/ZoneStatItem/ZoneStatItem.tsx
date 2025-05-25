import React from 'react';
import { ProcessedItem } from '../../types';

interface ZoneStatItemProps {
    zone: string;
    numberRange: number;
    processedItems: ProcessedItem[];
}

const ZoneStatItem: React.FC<ZoneStatItemProps> = ({
                                                       zone,
                                                       numberRange,
                                                       processedItems
                                                   }) => {
    const zoneStoredCount = processedItems.filter(item =>
        item.location.startsWith(zone + '-') && item.status === 'stored'
    ).length;

    return (
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                <span className="font-medium">구역 {zone}</span>
            </div>
            <div className="text-right">
                <div className="font-semibold">{numberRange}개 위치</div>
                <div className="text-sm text-gray-600">
                    {zone}-01 ~ {zone}-{String(numberRange).padStart(2, '0')}
                </div>
                {zoneStoredCount > 0 && (
                    <div className="text-sm text-blue-600 font-medium">
                        보관중: {zoneStoredCount}개
                    </div>
                )}
            </div>
        </div>
    );
};

export default ZoneStatItem;