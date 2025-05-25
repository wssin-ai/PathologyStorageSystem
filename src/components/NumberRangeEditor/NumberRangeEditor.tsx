import React from 'react';
import { Edit2 } from 'lucide-react';
import ZoneEditor from '../ZoneEditor/ZoneEditor';

interface NumberRangeEditorProps {
    zone: string;
    currentRange: number;
    isEditing: boolean;
    newRangeValue: string;
    onStartEdit: () => void;
    onSaveEdit: () => void;
    onCancelEdit: () => void;
    onValueChange: (value: string) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    editInputRef: React.RefObject<HTMLInputElement>;
}

const NumberRangeEditor: React.FC<NumberRangeEditorProps> = ({
                                                                 zone,
                                                                 currentRange,
                                                                 isEditing,
                                                                 newRangeValue,
                                                                 onStartEdit,
                                                                 onSaveEdit,
                                                                 onCancelEdit,
                                                                 onValueChange,
                                                                 onKeyDown,
                                                                 editInputRef
                                                             }) => {
    return (
        <div className="ml-6 mb-2 flex items-center gap-2 text-sm text-gray-600">
            <span>번호 범위: 01~</span>
            {isEditing ? (
                <ZoneEditor
                    value={newRangeValue}
                    onValueChange={onValueChange}
                    onSave={onSaveEdit}
                    onCancel={onCancelEdit}
                    onKeyDown={onKeyDown}
                    inputRef={editInputRef}
                    type="number"
                    min="1"
                    max="99"
                />
            ) : (
                <div className="flex items-center gap-1 group">
                    <span className="font-medium">
                        {String(currentRange).padStart(2, '0')}
                    </span>
                    <button
                        onClick={onStartEdit}
                        className="p-1 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="범위 편집"
                    >
                        <Edit2 className="h-3 w-3"/>
                    </button>
                </div>
            )}
        </div>
    );
};

export default NumberRangeEditor;