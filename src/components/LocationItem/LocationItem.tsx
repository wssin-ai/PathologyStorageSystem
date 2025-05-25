import React from 'react';

interface LocationItemProps {
    location: string;
    storedCount: number;
    isSelected: boolean;
    onSelect: () => void;
}

const LocationItem: React.FC<LocationItemProps> = ({
                                                       location,
                                                       storedCount,
                                                       isSelected,
                                                       onSelect
                                                   }) => {
    return (
        <div
            className={`flex items-center justify-between cursor-pointer p-2 rounded text-sm ${
                isSelected
                    ? 'bg-blue-100 text-blue-800 font-medium border border-blue-300'
                    : 'hover:bg-gray-100 text-gray-700'
            }`}
            onClick={onSelect}
        >
            <span className="flex items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                {location}
            </span>
            {storedCount > 0 && (
                <span className={`px-2 py-1 rounded-full text-xs ${
                    isSelected
                        ? 'bg-blue-200 text-blue-800'
                        : 'bg-gray-200 text-gray-600'
                }`}>
                    {storedCount}
                </span>
            )}
        </div>
    );
};

export default LocationItem;