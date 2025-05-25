import React from 'react';
import { getNumbersForZone, getStoredCountByLocation } from '../../utils';
import { ProcessedItem } from '../../types';
import LocationItem from '../LocationItem/LocationItem';

interface LocationListProps {
    zone: string;
    numberRange: number;
    selectedLocation: string;
    processedItems: ProcessedItem[];
    onLocationSelect: (location: string) => void;
}

const LocationList: React.FC<LocationListProps> = ({
                                                       zone,
                                                       numberRange,
                                                       selectedLocation,
                                                       processedItems,
                                                       onLocationSelect
                                                   }) => {
    return (
        <div className="ml-6 space-y-1 max-h-48 overflow-y-auto border-l border-gray-200 pl-2">
            {getNumbersForZone(numberRange).map(number => {
                const location = `${zone}-${number}`;
                const storedCount = getStoredCountByLocation(location, processedItems);
                const isSelected = selectedLocation === location;

                return (
                    <LocationItem
                        key={number}
                        location={location}
                        storedCount={storedCount}
                        isSelected={isSelected}
                        onSelect={() => onLocationSelect(location)}
                    />
                );
            })}
        </div>
    );
};

export default LocationList;

