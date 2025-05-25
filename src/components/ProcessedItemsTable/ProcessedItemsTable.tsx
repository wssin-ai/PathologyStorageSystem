import React from 'react';
import { ProcessedItem } from '../../types';

interface ProcessedItemsTableProps {
    items: ProcessedItem[];
}

const ProcessedItemsTable: React.FC<ProcessedItemsTableProps> = ({ items }) => {
    if (items.length === 0) {
        return (
            <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    처리된 검체가 없습니다.
                </td>
            </tr>
        );
    }

    return (
        <>
            {items.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-mono">{item.barcode}</td>
                    <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                            item.status === 'stored'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                        }`}>
                            {item.status === 'stored' ? '보관중' : '폐기됨'}
                        </span>
                    </td>
                    <td className="px-4 py-3 font-semibold">
                        {item.status === 'stored' ? item.location : '폐기됨'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                        {item.status === 'stored' ? item.timestamp : item.disposalTime}
                    </td>
                </tr>
            ))}
        </>
    );
};

export default ProcessedItemsTable;