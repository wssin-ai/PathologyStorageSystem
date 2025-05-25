import React from 'react';
import { ProcessedItem } from '../../types';

interface DisposalItemTableProps {
    items: ProcessedItem[];
    selectedItems: number[];
    selectAll: boolean;
    onItemSelect: (itemId: number) => void;
    onSelectAll: () => void;
}

const DisposalItemTable: React.FC<DisposalItemTableProps> = ({
                                                                 items,
                                                                 selectedItems,
                                                                 selectAll,
                                                                 onItemSelect,
                                                                 onSelectAll
                                                             }) => {
    if (items.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500 border border-gray-200 rounded-md">
                해당 보관장소에 검체가 없습니다.
            </div>
        );
    }

    return (
        <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md">
            <table className="w-full">
                <thead className="bg-gray-100 sticky top-0">
                <tr>
                    <th className="px-4 py-2 text-left">
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={onSelectAll}
                            className="mr-2"
                        />
                        선택
                    </th>
                    <th className="px-4 py-2 text-left">바코드</th>
                    <th className="px-4 py-2 text-left">보관일시</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-2">
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item.id)}
                                onChange={() => onItemSelect(item.id)}
                                className="mr-2"
                            />
                        </td>
                        <td className="px-4 py-2 font-mono">{item.barcode}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{item.timestamp}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DisposalItemTable;