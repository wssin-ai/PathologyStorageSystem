import React, { useRef } from 'react';
import { Folder, Plus } from 'lucide-react';
import { NumberRanges, ProcessedItem, WorkMode } from '../../types';
import ZoneHeader from '../ZoneHeader/ZoneHeader';
import NumberRangeEditor from '../NumberRangeEditor/NumberRangeEditor';
import LocationList from '../LocationList/LocationList';
import SelectedLocationDisplay from '../SelectedLocationDisplay/SelectedLocationDisplay';

interface ZoneTreeProps {
    mode: WorkMode;
    zones: string[];
    numberRanges: NumberRanges;
    expandedZones: string[];
    selectedLocation: string;
    processedItems: ProcessedItem[];
    editingZone: string | null;
    editingRange: string | null;
    newZoneName: string;
    newRangeValue: string;
    onLocationSelect: (location: string) => void;
    onToggleZone: (zone: string) => void;
    onAddNewZone: () => void;
    onStartEditingZone: (zone: string) => void;
    onSaveZoneName: () => void;
    onCancelEditingZone: () => void;
    onDeleteZone: (zone: string) => void;
    onStartEditingRange: (zone: string) => void;
    onSaveRangeValue: () => void;
    onCancelEditingRange: () => void;
    onNewZoneNameChange: (name: string) => void;
    onNewRangeValueChange: (value: string) => void;
    onKeyPress: (e: React.KeyboardEvent, action: () => void) => void;
}

const ZoneTree: React.FC<ZoneTreeProps> = ({
                                               mode,
                                               zones,
                                               numberRanges,
                                               expandedZones,
                                               selectedLocation,
                                               processedItems,
                                               editingZone,
                                               editingRange,
                                               newZoneName,
                                               newRangeValue,
                                               onLocationSelect,
                                               onToggleZone,
                                               onAddNewZone,
                                               onStartEditingZone,
                                               onSaveZoneName,
                                               onCancelEditingZone,
                                               onDeleteZone,
                                               onStartEditingRange,
                                               onSaveRangeValue,
                                               onCancelEditingRange,
                                               onNewZoneNameChange,
                                               onNewRangeValueChange,
                                               onKeyPress
                                           }) => {
    const editInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="w-96 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700 flex items-center">
                    <Folder className="mr-2 h-5 w-5"/>
                    {mode === 'storage' ? '보관 장소 선택' : '폐기할 보관 장소 선택'}
                </h2>
                <button
                    onClick={onAddNewZone}
                    className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                    <Plus className="h-4 w-4 mr-1"/>
                    구역 추가
                </button>
            </div>

            <div className="space-y-1 max-h-96 overflow-y-auto">
                {zones.map(zone => (
                    <div key={zone}>
                        <ZoneHeader
                            zone={zone}
                            isExpanded={expandedZones.includes(zone)}
                            isEditing={editingZone === zone}
                            newZoneName={newZoneName}
                            onToggle={() => onToggleZone(zone)}
                            onStartEdit={() => onStartEditingZone(zone)}
                            onSaveEdit={onSaveZoneName}
                            onCancelEdit={onCancelEditingZone}
                            onDelete={() => onDeleteZone(zone)}
                            onNameChange={onNewZoneNameChange}
                            onKeyDown={(e) => onKeyPress(e, onSaveZoneName)}
                            editInputRef={editInputRef}
                        />

                        {expandedZones.includes(zone) && (
                            <>
                                <NumberRangeEditor
                                    zone={zone}
                                    currentRange={numberRanges[zone]}
                                    isEditing={editingRange === zone}
                                    newRangeValue={newRangeValue}
                                    onStartEdit={() => onStartEditingRange(zone)}
                                    onSaveEdit={onSaveRangeValue}
                                    onCancelEdit={onCancelEditingRange}
                                    onValueChange={onNewRangeValueChange}
                                    onKeyDown={(e) => onKeyPress(e, onSaveRangeValue)}
                                    editInputRef={editInputRef}
                                />

                                <LocationList
                                    zone={zone}
                                    numberRange={numberRanges[zone]}
                                    selectedLocation={selectedLocation}
                                    processedItems={processedItems}
                                    onLocationSelect={onLocationSelect}
                                />
                            </>
                        )}
                    </div>
                ))}
            </div>

            <SelectedLocationDisplay
                selectedLocation={selectedLocation}
                processedItems={processedItems}
            />
        </div>
    );
};

export default ZoneTree;