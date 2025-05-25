import React from 'react';

interface BarcodeInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (e?: React.FormEvent) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    disabled?: boolean;
}

const BarcodeInput: React.FC<BarcodeInputProps> = ({
                                                       value,
                                                       onChange,
                                                       onSubmit,
                                                       inputRef,
                                                       disabled = false
                                                   }) => {
    return (
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">바코드 스캔</h2>
            <div className="flex gap-4 items-center">
                <div className="flex-1">
                    <input
                        ref={inputRef}
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                onSubmit(e);
                            }
                        }}
                        placeholder="바코드를 스캔하거나 직접 입력하세요"
                        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        autoComplete="off"
                        disabled={disabled}
                    />
                </div>
                <button
                    onClick={() => onSubmit()}
                    disabled={!value.trim() || disabled}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    보관
                </button>
            </div>
        </div>
    );
};

export default BarcodeInput;