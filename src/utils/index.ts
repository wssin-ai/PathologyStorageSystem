// src/utils/index.ts

import {ProcessedItem} from '../types';

/**
 * 구역별 번호 배열 생성
 */
export const getNumbersForZone = (count: number): string[] => {
    return Array.from({length: count}, (_, i) =>
        String(i + 1).padStart(2, '0')
    );
};

/**
 * 각 위치별 보관된 검체 수 계산
 */
export const getStoredCountByLocation = (
    location: string,
    processedItems: ProcessedItem[]
): number => {
    return processedItems.filter(item =>
        item.location === location && item.status === 'stored'
    ).length;
};

/**
 * 특정 위치의 보관된 검체 목록 가져오기
 */
export const getStoredItemsByLocation = (
    location: string,
    processedItems: ProcessedItem[]
): ProcessedItem[] => {
    return processedItems.filter(item =>
        item.location === location && item.status === 'stored'
    );
};

/**
 * 구역에 보관된 검체가 있는지 확인
 */
export const hasStoredItemsInZone = (
    zone: string,
    processedItems: ProcessedItem[]
): boolean => {
    return processedItems.some(item =>
        item.location.startsWith(zone) && item.status === 'stored'
    );
};

/**
 * 특정 범위에 보관된 검체가 있는지 확인
 */
export const hasStoredItemsInRange = (
    zone: string,
    newValue: number,
    processedItems: ProcessedItem[]
): boolean => {
    return processedItems.some(item => {
        if (!item.location.startsWith(zone + '-') || item.status !== 'stored') return false;
        const locationNumber = parseInt(item.location.split('-')[1]);
        return locationNumber > newValue;
    });
};

/**
 * 현재 날짜/시간을 한국어 형식으로 반환
 */
export const getCurrentTimestamp = (): string => {
    return new Date().toLocaleString('ko-KR');
};

/**
 * 새로운 검체 아이템 생성
 */
export const createNewItem = (
    barcode: string,
    location: string,
    mode: 'storage' | 'disposal'
): ProcessedItem => {
    return {
        id: Date.now(),
        barcode: barcode.trim(),
        mode,
        location,
        timestamp: getCurrentTimestamp(),
        status: 'stored'
    };
};

/**
 * 검체 폐기 처리
 */
export const disposeItems = (
    items: ProcessedItem[],
    selectedIds: number[]
): ProcessedItem[] => {
    const timestamp = getCurrentTimestamp();

    return items.map(item => {
        if (selectedIds.includes(item.id)) {
            return {
                ...item,
                status: 'disposed' as const,
                disposalTime: timestamp
            };
        }
        return item;
    });
};

/**
 * 검체 위치 업데이트 (구역명 변경 시)
 */
export const updateItemLocations = (
    items: ProcessedItem[],
    oldZone: string,
    newZone: string
): ProcessedItem[] => {
    return items.map(item => ({
        ...item,
        location: item.location.startsWith(oldZone + '-')
            ? item.location.replace(oldZone + '-', newZone + '-')
            : item.location
    }));
};

/**
 * 다음 가능한 구역명 생성
 */
export const getNextZoneName = (existingZones: string[]): string | null => {
    if (existingZones.length >= 26) return null;
    return String.fromCharCode(65 + existingZones.length);
};

/**
 * 구역명 유효성 검사
 */
export const isValidZoneName = (name: string, existingZones: string[]): boolean => {
    const upperName = name.toUpperCase();
    return name.trim() !== '' &&
        !existingZones.includes(upperName) &&
        /^[A-Z]{1,2}$/.test(upperName);
};

/**
 * 범위 값 유효성 검사
 */
export const isValidRangeValue = (value: string): boolean => {
    const num = parseInt(value);
    return !isNaN(num) && num >= 1 && num <= 99;
};