// src/hooks/useItemManagement.ts
import {useState, useCallback} from 'react';
import {ProcessedItem, WorkMode} from '../types';
import {createNewItem, disposeItems, getStoredItemsByLocation} from '../utils';

interface UseItemManagementProps {
    onNotification: (message: string) => void;
}

export const useItemManagement = ({onNotification}: UseItemManagementProps) => {
    const [processedItems, setProcessedItems] = useState<ProcessedItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);

    const addItem = useCallback((barcode: string, location: string, mode: WorkMode) => {
        if (!barcode.trim()) return;

        const newItem = createNewItem(barcode, location, mode);
        setProcessedItems(prev => [newItem, ...prev]);

        const message = `검체 ${barcode}이 ${location}에 보관되었습니다.`;
        onNotification(message);
    }, [onNotification]);

    const disposeSelectedItems = useCallback(() => {
        if (selectedItems.length === 0) return;

        const updatedItems = disposeItems(processedItems, selectedItems);
        setProcessedItems(updatedItems);

        onNotification(`${selectedItems.length}개 검체가 폐기 처리되었습니다.`);
        setSelectedItems([]);
        setSelectAll(false);
    }, [processedItems, selectedItems, onNotification]);

    const handleItemSelect = useCallback((itemId: number) => {
        setSelectedItems(prev => {
            if (prev.includes(itemId)) {
                return prev.filter(id => id !== itemId);
            } else {
                return [...prev, itemId];
            }
        });
    }, []);

    const handleSelectAll = useCallback((location: string) => {
        const currentLocationItems = getStoredItemsByLocation(location, processedItems);

        if (selectAll) {
            setSelectedItems(prev => prev.filter(id =>
                !currentLocationItems.some(item => item.id === id)
            ));
        } else {
            setSelectedItems(prev => [
                ...prev,
                ...currentLocationItems.map(item => item.id).filter(id => !prev.includes(id))
            ]);
        }
        setSelectAll(!selectAll);
    }, [processedItems, selectAll]);

    const resetSelection = useCallback(() => {
        setSelectedItems([]);
        setSelectAll(false);
    }, []);

    return {
        processedItems,
        selectedItems,
        selectAll,
        setProcessedItems,
        addItem,
        disposeSelectedItems,
        handleItemSelect,
        handleSelectAll,
        resetSelection
    };
};