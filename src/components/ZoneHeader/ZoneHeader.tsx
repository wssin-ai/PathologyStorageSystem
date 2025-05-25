import React from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, Edit2, Trash2 } from 'lucide-react';
import ZoneEditor from '../ZoneEditor/ZoneEditor';

interface ZoneHeaderProps {
    zone: string;
    isExpanded: boolean;
    isEditing: boolean;
    newZoneName: string;
    onToggle: () => void;
    onStartEdit: () => void;
    onSaveEdit: () => void;
    onCancelEdit: () => void;
    onDelete: () => void;
    onNameChange: (name: string) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    editInputRef: React.RefObject<HTMLInputElement>;
}

const ZoneHeader: React.FC<ZoneHeaderProps> = ({
                                                   zone,
                                                   isExpanded,
                                                   isEditing,
                                                   newZoneName,
                                                   onToggle,
                                                   onStartEdit,
                                                   onSaveEdit,
                                                   onCancelEdit,
                                                   onDelete,
                                                   onNameChange,
                                                   onKeyDown,
                                                   editInputRef
                                               }) => {
    return (
        <div className="flex items-center justify-between group hover:bg-gray-100 p-2 rounded">
            <div className="flex items-center cursor-pointer flex-1" onClick={onToggle}>
                {isExpanded ? (
                    <ChevronDown className="h-4 w-4 mr-1 text-gray-500"/>
                ) : (
                    <ChevronRight className="h-4 w-4 mr-1 text-gray-500"/>
                )}
                {isExpanded ? (
                    <FolderOpen className="h-4 w-4 mr-2 text-blue-600"/>
                ) : (
                    <Folder className="h-4 w-4 mr-2 text-blue-600"/>
                )}

                {isEditing ? (
                    <ZoneEditor
                        value={newZoneName}
                        onValueChange={onNameChange}
                        onSave={onSaveEdit}
                        onCancel={onCancelEdit}
                        onKeyDown={onKeyDown}
                        inputRef={editInputRef}
                        maxLength={2}
                    />
                ) : (
                    <span className="font-medium text-gray-700">구역 {zone}</span>
                )}
            </div>

            {!isEditing && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={onStartEdit}
                        className="p-1 text-gray-500 hover:text-blue-600"
                        title="구역명 편집"
                    >
                        <Edit2 className="h-3 w-3"/>
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-1 text-gray-500 hover:text-red-600"
                        title="구역 삭제"
                    >
                        <Trash2 className="h-3 w-3"/>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ZoneHeader;
