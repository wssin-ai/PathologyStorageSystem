// src/types/index.ts

export interface ProcessedItem {
    id: number;
    barcode: string;
    mode: 'storage' | 'disposal';
    location: string;
    timestamp: string;
    status: 'stored' | 'disposed';
    disposalTime?: string;
}

export interface NumberRanges {
    [key: string]: number;
}

export type WorkMode = 'storage' | 'disposal';

export interface NotificationState {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
}

// 컴포넌트 Props 타입
export interface LocationItemProps {
    location: string;
    storedCount: number;
    isSelected: boolean;
    onSelect: (location: string) => void;
}

export interface ZoneHeaderProps {
    zone: string;
    isExpanded: boolean;
    isEditing: boolean;
    newZoneName: string;
    onToggle: (zone: string) => void;
    onStartEdit: (zone: string) => void;
    onSaveEdit: () => void;
    onCancelEdit: () => void;
    onDelete: (zone: string) => void;
    onNameChange: (name: string) => void;
}

export interface StorageStatsProps {
    totalProcessed: number;
    totalStored: number;
    totalDisposed: number;
}

export interface ZoneStatsProps {
    zones: string[];
    numberRanges: NumberRanges;
    processedItems: ProcessedItem[];
}