import React from 'react';
import { WorkMode } from '../../types';

interface ModeSelectorProps {
    mode: WorkMode;
    onModeChange: (mode: WorkMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, onModeChange }) => {
    return (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">작업 모드 선택</h2>
            <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                    <input
                        type="radio"
                        value="storage"
                        checked={mode === 'storage'}
                        onChange={(e) => onModeChange(e.target.value as WorkMode)}
                        className="mr-2 text-blue-600"
                    />
                    <span className="text-lg">보관</span>
                </label>
                <label className="flex items-center cursor-pointer">
                    <input
                        type="radio"
                        value="disposal"
                        checked={mode === 'disposal'}
                        onChange={(e) => onModeChange(e.target.value as WorkMode)}
                        className="mr-2 text-red-600"
                    />
                    <span className="text-lg">폐기</span>
                </label>
            </div>
        </div>
    );
};

export default ModeSelector;