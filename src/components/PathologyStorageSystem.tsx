import React, { useState, useRef, useEffect } from 'react';
import { WorkMode } from '../types';
import { useNotification, useZoneManagement, useItemManagement } from '../hooks';
import { getStoredItemsByLocation } from '../utils';

// 컴포넌트 imports
import Header from './Header/Header';
import Notification from './Notification/Notification';
import ModeSelector from './ModeSelector/ModeSelector';
import ZoneTree from './ZoneTree/ZoneTree';
import BarcodeInput from './BarcodeInput/BarcodeInput';
import DisposalPanel from './DisposalPanel/DisposalPanel';
import ProcessedItemsHistory from './ProcessedItemsHistory/ProcessedItemsHistory';
import StatisticsPanel from './StatisticsPanel/StatisticsPanel';
import ZoneStatistics from './ZoneStatistics/ZoneStatistics';
import UsageGuide from './UsageGuide/UsageGuide';

const PathologyStorageSystem: React.FC = () => {
    // 기본 상태
    const [mode, setMode] = useState<WorkMode>('storage');
    const [selectedLocation, setSelectedLocation] = useState<string>('A-01');
    const [barcodeInput, setBarcodeInput] = useState<string>('');

    // 편집 상태
    const [editingZone, setEditingZone] = useState<string | null>(null);
    const [editingRange, setEditingRange] = useState<string | null>(null);
    const [newZoneName, setNewZoneName] = useState<string>('');
    const [newRangeValue, setNewRangeValue] = useState<string>('');

    // Refs
    const barcodeInputRef = useRef<HTMLInputElement>(null);

    // 커스텀 훅 사용
    const { notification, showNotification } = useNotification();
    const {
        processedItems,
        selectedItems,
        selectAll,
        setProcessedItems,
        addItem,
        disposeSelectedItems,
        handleItemSelect,
        handleSelectAll,
        resetSelection
    } = useItemManagement({ onNotification: showNotification });

    const {
        zones,
        numberRanges,
        expandedZones,
        addNewZone,
        deleteZone,
        updateZoneName,
        updateNumberRange,
        toggleZone
    } = useZoneManagement({
        processedItems,
        onItemsUpdate: setProcessedItems,
        onNotification: showNotification
    });

    // 위치 선택 처리
    const handleLocationSelect = (location: string): void => {
        setSelectedLocation(location);
    };

    // 구역명 편집 시작
    const startEditingZone = (zone: string): void => {
        setEditingZone(zone);
        setNewZoneName(zone);
    };

    // 구역명 편집 저장
    const saveZoneName = (): void => {
        if (!newZoneName.trim() || newZoneName === editingZone) {
            setEditingZone(null);
            return;
        }

        if (editingZone && updateZoneName(editingZone, newZoneName)) {
            // 선택된 위치 업데이트
            if (selectedLocation.startsWith(editingZone)) {
                const locationNumber = selectedLocation.split('-')[1];
                setSelectedLocation(`${newZoneName.toUpperCase()}-${locationNumber}`);
            }
            setEditingZone(null);
        }
    };

    // 구역명 편집 취소
    const cancelEditingZone = (): void => {
        setEditingZone(null);
        setNewZoneName('');
    };

    // 번호 범위 편집 시작
    const startEditingRange = (zone: string): void => {
        setEditingRange(zone);
        setNewRangeValue(numberRanges[zone].toString());
    };

    // 번호 범위 편집 저장
    const saveRangeValue = (): void => {
        const newValue = parseInt(newRangeValue);
        if (isNaN(newValue) || newValue < 1 || newValue > 99) {
            showNotification('1~99 사이의 숫자를 입력해주세요.');
            return;
        }

        if (editingRange && updateNumberRange(editingRange, newValue)) {
            // 선택된 위치가 새 범위를 벗어나면 조정
            if (selectedLocation.startsWith(editingRange)) {
                const locationNumber = parseInt(selectedLocation.split('-')[1]);
                if (locationNumber > newValue) {
                    setSelectedLocation(`${editingRange}-01`);
                }
            }
            setEditingRange(null);
        }
    };

    // 번호 범위 편집 취소
    const cancelEditingRange = (): void => {
        setEditingRange(null);
        setNewRangeValue('');
    };

    // 키보드 이벤트 처리
    const handleKeyPress = (e: React.KeyboardEvent, action: () => void): void => {
        if (e.key === 'Enter') {
            action();
        } else if (e.key === 'Escape') {
            if (editingZone) cancelEditingZone();
            if (editingRange) cancelEditingRange();
        }
    };

    // 바코드 입력 처리
    const handleBarcodeSubmit = (e?: React.FormEvent): void => {
        if (e) e.preventDefault();
        if (!barcodeInput.trim()) return;

        if (mode === 'storage') {
            addItem(barcodeInput.trim(), selectedLocation, mode);
            setBarcodeInput('');
        }
    };

    // 선택된 검체 폐기 처리
    const handleDisposeSelected = (): void => {
        disposeSelectedItems();
    };

    // 전체 선택/해제 처리
    const handleSelectAllCurrent = (): void => {
        handleSelectAll(selectedLocation);
    };

    // 모드 변경시 선택 상태 초기화
    useEffect(() => {
        resetSelection();
    }, [mode, selectedLocation, resetSelection]);

    // 바코드 입력 필드에 자동 포커스
    useEffect(() => {
        if (barcodeInputRef.current && mode === 'storage') {
            barcodeInputRef.current.focus();
        }
    }, [mode, selectedLocation]);

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white">
            <Header />

            <Notification message={notification} />

            <ModeSelector mode={mode} onModeChange={setMode} />

            <div className="flex gap-6">
                {/* 좌측 - 수정 가능한 파일트리 */}
                <ZoneTree
                    mode={mode}
                    zones={zones}
                    numberRanges={numberRanges}
                    expandedZones={expandedZones}
                    selectedLocation={selectedLocation}
                    processedItems={processedItems}
                    editingZone={editingZone}
                    editingRange={editingRange}
                    newZoneName={newZoneName}
                    newRangeValue={newRangeValue}
                    onLocationSelect={handleLocationSelect}
                    onToggleZone={toggleZone}
                    onAddNewZone={addNewZone}
                    onStartEditingZone={startEditingZone}
                    onSaveZoneName={saveZoneName}
                    onCancelEditingZone={cancelEditingZone}
                    onDeleteZone={deleteZone}
                    onStartEditingRange={startEditingRange}
                    onSaveRangeValue={saveRangeValue}
                    onCancelEditingRange={cancelEditingRange}
                    onNewZoneNameChange={setNewZoneName}
                    onNewRangeValueChange={setNewRangeValue}
                    onKeyPress={handleKeyPress}
                />

                {/* 우측 콘텐츠 영역 */}
                <div className="flex-1">
                    {/* 바코드 입력 - 보관 모드일 때만 표시 */}
                    {mode === 'storage' && (
                        <BarcodeInput
                            value={barcodeInput}
                            onChange={setBarcodeInput}
                            onSubmit={handleBarcodeSubmit}
                            inputRef={barcodeInputRef}
                        />
                    )}

                    {/* 폐기 검체 선택 - 폐기 모드일 때만 표시 */}
                    {mode === 'disposal' && (
                        <DisposalPanel
                            selectedLocation={selectedLocation}
                            processedItems={processedItems}
                            selectedItems={selectedItems}
                            selectAll={selectAll}
                            onItemSelect={handleItemSelect}
                            onSelectAll={handleSelectAllCurrent}
                            onDisposeSelected={handleDisposeSelected}
                        />
                    )}

                    {/* 처리 내역 */}
                    <ProcessedItemsHistory items={processedItems} />

                    {/* 통계 정보 */}
                    <StatisticsPanel items={processedItems} />

                    {/* 구역별 통계 */}
                    <ZoneStatistics
                        zones={zones}
                        numberRanges={numberRanges}
                        processedItems={processedItems}
                    />

                    {/* 사용 가이드 */}
                    <UsageGuide />
                </div>
            </div>
        </div>
    );
};

export default PathologyStorageSystem;