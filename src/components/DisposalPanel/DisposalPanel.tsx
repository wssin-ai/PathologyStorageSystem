import React from 'react';
import { ProcessedItem } from '../../types';
import { getStoredItemsByLocation } from '../../utils';
import DisposalItemTable from '../DisposalItemTable/DisposalItemTable';

interface DisposalPanelProps {
    selectedLocation: string;
    processedItems: ProcessedItem[];
    selectedItems: number[];
    selectAll: boolean;
    onItemSelect: (itemId: number) => void;
    onSelectAll: () => void;
    onDisposeSelected: () => void;
}

const DisposalPanel: React.FC<DisposalPanelProps> = ({
                                                         selectedLocation,
                                                         processedItems,
                                                         selectedItems,
                                                         selectAll,
                                                         onItemSelect,
                                                         onSelectAll,
                                                         onDisposeSelected
                                                     }) => {
    const storedItems = getStoredItemsByLocation(selectedLocation, processedItems);

    return (
        <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-700">
                    {selectedLocation} 보관 검체 목록
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={onSelectAll}
                        disabled={storedItems.length === 0}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {selectAll ? '전체 해제' : '전체 선택'}
                    </button>
                    <button
                        onClick={onDisposeSelected}
                        disabled={selectedItems.length === 0}
                        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        선택 폐기 ({selectedItems.length})
                    </button>
                </div>
            </div>

            <DisposalItemTable
                items={storedItems}
                selectedItems={selectedItems}
                selectAll={selectAll}
                onItemSelect={onItemSelect}
                onSelectAll={onSelectAll}
            />
        </div>
    );
};

export default DisposalPanel;
