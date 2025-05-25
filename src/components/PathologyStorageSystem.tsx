// src/components/PathologyStorageSystem.tsx
import React, {useState, useRef, useEffect} from 'react';
import {ChevronRight, ChevronDown, Folder, FolderOpen, Plus, Edit2, Save, X, Trash2} from 'lucide-react';
import {WorkMode} from '../types';
import {useNotification, useZoneManagement, useItemManagement} from '../hooks';
import {getNumbersForZone, getStoredCountByLocation, getStoredItemsByLocation} from '../utils';

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
    const editInputRef = useRef<HTMLInputElement>(null);
    const barcodeInputRef = useRef<HTMLInputElement>(null);

    // 커스텀 훅 사용
    const {notification, showNotification} = useNotification();
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
    } = useItemManagement({onNotification: showNotification});

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
        setTimeout(() => editInputRef.current?.focus(), 0);
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
        setTimeout(() => editInputRef.current?.focus(), 0);
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

    // 폐기할 보관장소의 검체 목록 가져오기
    const getStoredItemsByLocationCurrent = () => {
        return getStoredItemsByLocation(selectedLocation, processedItems);
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
            {/* 헤더 */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    조직병리검사대상물 보관/폐기 관리 시스템
                </h1>
                <div className="h-1 bg-blue-500 w-full"></div>
            </div>

            {/* 알림 메시지 */}
            {notification && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    {notification}
                </div>
            )}

            {/* 작업 모드 선택 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold mb-3 text-gray-700">작업 모드 선택</h2>
                <div className="flex gap-6">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            value="storage"
                            checked={mode === 'storage'}
                            onChange={(e) => setMode(e.target.value as WorkMode)}
                            className="mr-2 text-blue-600"
                        />
                        <span className="text-lg">보관</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            value="disposal"
                            checked={mode === 'disposal'}
                            onChange={(e) => setMode(e.target.value as WorkMode)}
                            className="mr-2 text-red-600"
                        />
                        <span className="text-lg">폐기</span>
                    </label>
                </div>
            </div>

            <div className="flex gap-6">
                {/* 좌측 - 수정 가능한 파일트리 */}
                <div className="w-96 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-700 flex items-center">
                            <Folder className="mr-2 h-5 w-5"/>
                            {mode === 'storage' ? '보관 장소 선택' : '폐기할 보관 장소 선택'}
                        </h2>
                        <button
                            onClick={addNewZone}
                            className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                        >
                            <Plus className="h-4 w-4 mr-1"/>
                            구역 추가
                        </button>
                    </div>

                    <div className="space-y-1 max-h-96 overflow-y-auto">
                        {zones.map(zone => (
                            <div key={zone}>
                                {/* 구역 헤더 */}
                                <div className="flex items-center justify-between group hover:bg-gray-100 p-2 rounded">
                                    <div
                                        className="flex items-center cursor-pointer flex-1"
                                        onClick={() => toggleZone(zone)}
                                    >
                                        {expandedZones.includes(zone) ? (
                                            <ChevronDown className="h-4 w-4 mr-1 text-gray-500"/>
                                        ) : (
                                            <ChevronRight className="h-4 w-4 mr-1 text-gray-500"/>
                                        )}
                                        {expandedZones.includes(zone) ? (
                                            <FolderOpen className="h-4 w-4 mr-2 text-blue-600"/>
                                        ) : (
                                            <Folder className="h-4 w-4 mr-2 text-blue-600"/>
                                        )}

                                        {editingZone === zone ? (
                                            <div className="flex items-center gap-1">
                                                <input
                                                    ref={editInputRef}
                                                    type="text"
                                                    value={newZoneName}
                                                    onChange={(e) => setNewZoneName(e.target.value)}
                                                    onKeyDown={(e) => handleKeyPress(e, saveZoneName)}
                                                    className="w-16 px-2 py-1 text-sm border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                    maxLength={2}
                                                />
                                                <button
                                                    onClick={saveZoneName}
                                                    className="p-1 text-green-600 hover:text-green-800"
                                                >
                                                    <Save className="h-3 w-3"/>
                                                </button>
                                                <button
                                                    onClick={cancelEditingZone}
                                                    className="p-1 text-red-600 hover:text-red-800"
                                                >
                                                    <X className="h-3 w-3"/>
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="font-medium text-gray-700">구역 {zone}</span>
                                        )}
                                    </div>

                                    {editingZone !== zone && (
                                        <div
                                            className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => startEditingZone(zone)}
                                                className="p-1 text-gray-500 hover:text-blue-600"
                                                title="구역명 편집"
                                            >
                                                <Edit2 className="h-3 w-3"/>
                                            </button>
                                            <button
                                                onClick={() => deleteZone(zone)}
                                                className="p-1 text-gray-500 hover:text-red-600"
                                                title="구역 삭제"
                                            >
                                                <Trash2 className="h-3 w-3"/>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* 번호 범위 설정 */}
                                {expandedZones.includes(zone) && (
                                    <div className="ml-6 mb-2 flex items-center gap-2 text-sm text-gray-600">
                                        <span>번호 범위: 01~</span>
                                        {editingRange === zone ? (
                                            <div className="flex items-center gap-1">
                                                <input
                                                    ref={editInputRef}
                                                    type="number"
                                                    value={newRangeValue}
                                                    onChange={(e) => setNewRangeValue(e.target.value)}
                                                    onKeyDown={(e) => handleKeyPress(e, saveRangeValue)}
                                                    className="w-16 px-2 py-1 text-sm border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                    min="1"
                                                    max="99"
                                                />
                                                <button
                                                    onClick={saveRangeValue}
                                                    className="p-1 text-green-600 hover:text-green-800"
                                                >
                                                    <Save className="h-3 w-3"/>
                                                </button>
                                                <button
                                                    onClick={cancelEditingRange}
                                                    className="p-1 text-red-600 hover:text-red-800"
                                                >
                                                    <X className="h-3 w-3"/>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1 group">
                                                <span className="font-medium">
                                                    {String(numberRanges[zone]).padStart(2, '0')}
                                                </span>
                                                <button
                                                    onClick={() => startEditingRange(zone)}
                                                    className="p-1 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="범위 편집"
                                                >
                                                    <Edit2 className="h-3 w-3"/>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* 구역별 번호 목록 */}
                                {expandedZones.includes(zone) && (
                                    <div
                                        className="ml-6 space-y-1 max-h-48 overflow-y-auto border-l border-gray-200 pl-2">
                                        {getNumbersForZone(numberRanges[zone]).map(number => {
                                            const location = `${zone}-${number}`;
                                            const storedCount = getStoredCountByLocation(location, processedItems);
                                            const isSelected = selectedLocation === location;

                                            return (
                                                <div
                                                    key={number}
                                                    className={`flex items-center justify-between cursor-pointer p-2 rounded text-sm ${
                                                        isSelected
                                                            ? 'bg-blue-100 text-blue-800 font-medium border border-blue-300'
                                                            : 'hover:bg-gray-100 text-gray-700'
                                                    }`}
                                                    onClick={() => handleLocationSelect(location)}
                                                >
                                                    <span className="flex items-center">
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                                                        {location}
                                                    </span>
                                                    {storedCount > 0 && (
                                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                                            isSelected
                                                                ? 'bg-blue-200 text-blue-800'
                                                                : 'bg-gray-200 text-gray-600'
                                                        }`}>
                                                            {storedCount}
                                                        </span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* 선택된 위치 표시 */}
                    <div className="mt-4 p-3 bg-blue-100 rounded-md border border-blue-200">
                        <div className="text-sm text-blue-600 font-medium">선택된 위치</div>
                        <div className="text-lg font-bold text-blue-800">{selectedLocation}</div>
                        {getStoredCountByLocation(selectedLocation, processedItems) > 0 && (
                            <div className="text-sm text-blue-600">
                                보관중: {getStoredCountByLocation(selectedLocation, processedItems)}개
                            </div>
                        )}
                    </div>
                </div>

                {/* 우측 콘텐츠 영역 */}
                <div className="flex-1">
                    {/* 바코드 입력 - 보관 모드일 때만 표시 */}
                    {mode === 'storage' && (
                        <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <h2 className="text-lg font-semibold mb-3 text-gray-700">바코드 스캔</h2>
                            <div className="flex gap-4 items-center">
                                <div className="flex-1">
                                    <input
                                        ref={barcodeInputRef}
                                        type="text"
                                        value={barcodeInput}
                                        onChange={(e) => setBarcodeInput(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleBarcodeSubmit(e);
                                            }
                                        }}
                                        placeholder="바코드를 스캔하거나 직접 입력하세요"
                                        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        autoComplete="off"
                                    />
                                </div>
                                <button
                                    onClick={handleBarcodeSubmit}
                                    disabled={!barcodeInput.trim()}
                                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    보관
                                </button>
                            </div>
                        </div>
                    )}

                    {/* 폐기 검체 선택 - 폐기 모드일 때만 표시 */}
                    {mode === 'disposal' && (
                        <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-lg font-semibold text-gray-700">
                                    {selectedLocation} 보관 검체 목록
                                </h2>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSelectAllCurrent}
                                        disabled={getStoredItemsByLocationCurrent().length === 0}
                                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {selectAll ? '전체 해제' : '전체 선택'}
                                    </button>
                                    <button
                                        onClick={handleDisposeSelected}
                                        disabled={selectedItems.length === 0}
                                        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        선택 폐기 ({selectedItems.length})
                                    </button>
                                </div>
                            </div>

                            <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md">
                                {getStoredItemsByLocationCurrent().length === 0 ? (
                                    <div className="p-4 text-center text-gray-500">
                                        해당 보관장소에 검체가 없습니다.
                                    </div>
                                ) : (
                                    <table className="w-full">
                                        <thead className="bg-gray-100 sticky top-0">
                                        <tr>
                                            <th className="px-4 py-2 text-left">
                                                <input
                                                    type="checkbox"
                                                    checked={selectAll}
                                                    onChange={handleSelectAllCurrent}
                                                    className="mr-2"
                                                />
                                                선택
                                            </th>
                                            <th className="px-4 py-2 text-left">바코드</th>
                                            <th className="px-4 py-2 text-left">보관일시</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {getStoredItemsByLocationCurrent().map((item) => (
                                            <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItems.includes(item.id)}
                                                        onChange={() => handleItemSelect(item.id)}
                                                        className="mr-2"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 font-mono">{item.barcode}</td>
                                                <td className="px-4 py-2 text-sm text-gray-600">{item.timestamp}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    )}

                    {/* 처리 내역 */}
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
                                {processedItems.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                            처리된 검체가 없습니다.
                                        </td>
                                    </tr>
                                ) : (
                                    processedItems.map((item, index) => (
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
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 통계 정보 */}
                    {processedItems.length > 0 && (
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-100 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-800">총 처리 건수</h3>
                                <p className="text-2xl font-bold text-blue-900">{processedItems.length}</p>
                            </div>
                            <div className="bg-green-100 p-4 rounded-lg">
                                <h3 className="font-semibold text-green-800">보관중 검체</h3>
                                <p className="text-2xl font-bold text-green-900">
                                    {processedItems.filter(item => item.status === 'stored').length}
                                </p>
                            </div>
                            <div className="bg-red-100 p-4 rounded-lg">
                                <h3 className="font-semibold text-red-800">폐기된 검체</h3>
                                <p className="text-2xl font-bold text-red-900">
                                    {processedItems.filter(item => item.status === 'disposed').length}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* 구역별 통계 */}
                    <div className="mt-6 bg-white rounded-lg border border-gray-200">
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-700">구역별 통계</h2>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-green-100 p-4 rounded-lg">
                                    <h3 className="font-semibold text-green-800">총 구역 수</h3>
                                    <p className="text-2xl font-bold text-green-900">{zones.length}</p>
                                </div>
                                <div className="bg-purple-100 p-4 rounded-lg">
                                    <h3 className="font-semibold text-purple-800">총 보관 위치</h3>
                                    <p className="text-2xl font-bold text-purple-900">
                                        {Object.values(numberRanges).reduce((sum, count) => sum + count, 0)}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {zones.map(zone => {
                                    const zoneStoredCount = processedItems.filter(item =>
                                        item.location.startsWith(zone + '-') && item.status === 'stored'
                                    ).length;

                                    return (
                                        <div key={zone}
                                             className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                                                <span className="font-medium">구역 {zone}</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-semibold">{numberRanges[zone]}개 위치</div>
                                                <div className="text-sm text-gray-600">
                                                    {zone}-01 ~ {zone}-{String(numberRanges[zone]).padStart(2, '0')}
                                                </div>
                                                {zoneStoredCount > 0 && (
                                                    <div className="text-sm text-blue-600 font-medium">
                                                        보관중: {zoneStoredCount}개
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* 사용 가이드 */}
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h3 className="font-semibold text-yellow-800 mb-2">사용 가이드</h3>
                        <ul className="text-sm text-yellow-700 space-y-1">
                            <li>• 구역명을 클릭하면 해당 구역의 위치 목록을 펼치거나 접을 수 있습니다</li>
                            <li>• 구역에 마우스를 올리면 편집/삭제 버튼이 나타납니다</li>
                            <li>• 번호 범위를 편집하여 각 구역의 위치 개수를 조정할 수 있습니다</li>
                            <li>• 보관된 검체가 있는 구역은 삭제하거나 번호 범위를 축소할 수 없습니다</li>
                            <li>• 새 구역을 추가하면 자동으로 다음 알파벳이 할당됩니다</li>
                            <li>• Enter키로 편집을 저장하고, Esc키로 취소할 수 있습니다</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PathologyStorageSystem;