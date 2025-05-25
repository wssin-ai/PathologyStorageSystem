import React from 'react';

const UsageGuide: React.FC = () => {
    const guideItems = [
        "구역명을 클릭하면 해당 구역의 위치 목록을 펼치거나 접을 수 있습니다",
        "구역에 마우스를 올리면 편집/삭제 버튼이 나타납니다",
        "번호 범위를 편집하여 각 구역의 위치 개수를 조정할 수 있습니다",
        "보관된 검체가 있는 구역은 삭제하거나 번호 범위를 축소할 수 없습니다",
        "새 구역을 추가하면 자동으로 다음 알파벳이 할당됩니다",
        "Enter키로 편집을 저장하고, Esc키로 취소할 수 있습니다"
    ];

    return (
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-2">사용 가이드</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
                {guideItems.map((item, index) => (
                    <li key={index}>• {item}</li>
                ))}
            </ul>
        </div>
    );
};

export default UsageGuide;