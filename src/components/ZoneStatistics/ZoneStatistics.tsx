import React from 'react';
import { ProcessedItem, NumberRanges } from '../../types';
import StatCard from '../StatCard/StatCard';
import ZoneStatItem from '../ZoneStatItem/ZoneStatItem';

interface ZoneStatisticsProps {
    zones: string[];
    numberRanges: NumberRanges;
    processedItems: ProcessedItem[];
}

const ZoneStatistics: React.FC<ZoneStatisticsProps> = ({
                                                           zones,
                                                           numberRanges,
                                                           processedItems
                                                       }) => {
    const totalZones = zones.length;
    const totalLocations = Object.values(numberRanges).reduce((sum, count) => sum + count, 0);

    return (
        <div className="mt-6 bg-white rounded-lg border border-gray-200">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700">구역별 통계</h2>
            </div>
            <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <StatCard
                        title="총 구역 수"
                        value={totalZones}
                        bgColor="bg-green-100"
                        textColor="text-green-800"
                        valueColor="text-green-900"
                    />
                    <StatCard
                        title="총 보관 위치"
                        value={totalLocations}
                        bgColor="bg-purple-100"
                        textColor="text-purple-800"
                        valueColor="text-purple-900"
                    />
                </div>

                <div className="space-y-3">
                    {zones.map(zone => (
                        <ZoneStatItem
                            key={zone}
                            zone={zone}
                            numberRange={numberRanges[zone]}
                            processedItems={processedItems}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ZoneStatistics;
