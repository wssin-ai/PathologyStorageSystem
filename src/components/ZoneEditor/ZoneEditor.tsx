import React from 'react';
import { Save, X } from 'lucide-react';

interface ZoneEditorProps {
    value: string;
    onValueChange: (value: string) => void;
    onSave: () => void;
    onCancel: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    maxLength?: number;
    type?: 'text' | 'number';
    min?: string;
    max?: string;
}

const ZoneEditor: React.FC<ZoneEditorProps> = ({
                                                   value,
                                                   onValueChange,
                                                   onSave,
                                                   onCancel,
                                                   onKeyDown,
                                                   inputRef,
                                                   maxLength,
                                                   type = 'text',
                                                   min,
                                                   max
                                               }) => {
    return (
        <div className="flex items-center gap-1">
            <input
                ref={inputRef}
                type={type}
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                onKeyDown={onKeyDown}
                className="w-16 px-2 py-1 text-sm border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                maxLength={maxLength}
                min={min}
                max={max}
            />
            <button
                onClick={onSave}
                className="p-1 text-green-600 hover:text-green-800"
            >
                <Save className="h-3 w-3"/>
            </button>
            <button
                onClick={onCancel}
                className="p-1 text-red-600 hover:text-red-800"
            >
                <X className="h-3 w-3"/>
            </button>
        </div>
    );
};

export default ZoneEditor;