import React from 'react';
import { ProcessedItem } from '../../types';
import ProcessedItemsTable from '../ProcessedItemsTable/ProcessedItemsTable';

interface ProcessedItemsHistoryProps {
    items: ProcessedItem[];
}

const ProcessedItemsHistory: React.FC<ProcessedItemsHistoryProps> = ({ items }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700">처리 내역</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">순번</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">바코드</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">상태</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">보관위치</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">처리시간</th>
                    </tr>
                    </thead>
                    <tbody>
                    <ProcessedItemsTable items={items} />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProcessedItemsHistory;