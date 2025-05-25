import React from 'react';
import { getStoredCountByLocation } from '../../utils';
import { ProcessedItem } from '../../types';

interface SelectedLocationDisplayProps {
    selectedLocation: string;
    processedItems: ProcessedItem[];
}

const SelectedLocationDisplay: React.FC<SelectedLocationDisplayProps> = ({
                                                                             selectedLocation,
                                                                             processedItems
                                                                         }) => {
    const storedCount = getStoredCountByLocation(selectedLocation, processedItems);

    return (
        <div className="mt-4 p-3 bg-blue-100 rounded-md border border-blue-200">
            <div className="text-sm text-blue-600 font-medium">선택된 위치</div>
            <div className="text-lg font-bold text-blue-800">{selectedLocation}</div>
            {storedCount > 0 && (
                <div className="text-sm text-blue-600">
                    보관중: {storedCount}개
                </div>
            )}
        </div>
    );
};

export default SelectedLocationDisplay;
