// src/hooks/useZoneManagement.ts
import {useState, useCallback} from 'react';
import {NumberRanges, ProcessedItem} from '../types';
import {
    hasStoredItemsInZone,
    hasStoredItemsInRange,
    getNextZoneName,
    isValidZoneName,
    updateItemLocations
} from '../utils';

interface UseZoneManagementProps {
    processedItems: ProcessedItem[];
    onItemsUpdate: (items: ProcessedItem[]) => void;
    onNotification: (message: string) => void;
}

export const useZoneManagement = ({
                                      processedItems,
                                      onItemsUpdate,
                                      onNotification
                                  }: UseZoneManagementProps) => {
    const [zones, setZones] = useState<string[]>(['A', 'B', 'C', 'D', 'E']);
    const [numberRanges, setNumberRanges] = useState<NumberRanges>({
        A: 30, B: 30, C: 30, D: 30, E: 30
    });
    const [expandedZones, setExpandedZones] = useState<string[]>(['A']);

    const addNewZone = useCallback(() => {
        const newZone = getNextZoneName(zones);
        if (!newZone) {
            onNotification('최대 26개 구역까지만 생성 가능합니다.');
            return;
        }

        setZones(prev => [...prev, newZone]);
        setNumberRanges(prev => ({...prev, [newZone]: 30}));
        setExpandedZones(prev => [...prev, newZone]);
        onNotification(`구역 ${newZone}이 추가되었습니다.`);
    }, [zones, onNotification]);

    const deleteZone = useCallback((zoneToDelete: string) => {
        if (zones.length <= 1) {
            onNotification('최소 1개 구역은 유지되어야 합니다.');
            return;
        }

        if (hasStoredItemsInZone(zoneToDelete, processedItems)) {
            onNotification('보관된 검체가 있는 구역은 삭제할 수 없습니다.');
            return;
        }

        setZones(prev => prev.filter(zone => zone !== zoneToDelete));
        setNumberRanges(prev => {
            const newRanges = {...prev};
            delete newRanges[zoneToDelete];
            return newRanges;
        });
        setExpandedZones(prev => prev.filter(zone => zone !== zoneToDelete));
        onNotification(`구역 ${zoneToDelete}이 삭제되었습니다.`);
    }, [zones, processedItems, onNotification]);

    const updateZoneName = useCallback((oldZone: string, newZone: string) => {
        if (!isValidZoneName(newZone, zones.filter(z => z !== oldZone))) {
            onNotification('이미 존재하는 구역명이거나 유효하지 않은 구역명입니다.');
            return false;
        }

        const upperNewZone = newZone.toUpperCase();

        setZones(prev => prev.map(zone => zone === oldZone ? upperNewZone : zone));
        setNumberRanges(prev => {
            const newRanges = {...prev};
            newRanges[upperNewZone] = newRanges[oldZone];
            delete newRanges[oldZone];
            return newRanges;
        });
        setExpandedZones(prev => prev.map(zone => zone === oldZone ? upperNewZone : zone));

        // 검체 위치 업데이트
        const updatedItems = updateItemLocations(processedItems, oldZone, upperNewZone);
        onItemsUpdate(updatedItems);

        onNotification(`구역명이 ${oldZone}에서 ${upperNewZone}으로 변경되었습니다.`);
        return true;
    }, [zones, processedItems, onItemsUpdate, onNotification]);

    const updateNumberRange = useCallback((zone: string, newValue: number) => {
        const oldRange = numberRanges[zone];

        if (newValue < oldRange && hasStoredItemsInRange(zone, newValue, processedItems)) {
            onNotification(`${newValue + 1}번 이후에 보관된 검체가 있어 범위를 축소할 수 없습니다.`);
            return false;
        }

        setNumberRanges(prev => ({...prev, [zone]: newValue}));
        onNotification(`구역 ${zone}의 번호 범위가 ${oldRange}에서 ${newValue}로 변경되었습니다.`);
        return true;
    }, [numberRanges, processedItems, onNotification]);

    const toggleZone = useCallback((zone: string) => {
        setExpandedZones(prev =>
            prev.includes(zone)
                ? prev.filter(z => z !== zone)
                : [...prev, zone]
        );
    }, []);

    return {
        zones,
        numberRanges,
        expandedZones,
        addNewZone,
        deleteZone,
        updateZoneName,
        updateNumberRange,
        toggleZone
    };
};
