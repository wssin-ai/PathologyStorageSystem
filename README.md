# 조직병리검사대상물 보관/폐기 관리 시스템

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.7.4-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.1.8-38B2AC?style=flat-square&logo=tailwind-css)
![pnpm](https://img.shields.io/badge/pnpm-latest-orange?style=flat-square&logo=pnpm)

**병리과에서 사용하는 조직검사 대상물의 보관 및 폐기를 체계적으로 관리하는 웹 애플리케이션**

[데모 보기](#데모) • [설치 가이드](#설치) • [기능 소개](#주요-기능) • [기여하기](#기여하기)

</div>

---

## 📋 목차

- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [설치 및 실행](#설치-및-실행)
- [프로젝트 구조](#프로젝트-구조)
- [사용법](#사용법)
- [개발 가이드](#개발-가이드)
- [API 문서](#api-문서)
- [기여하기](#기여하기)
- [라이선스](#라이선스)

## 🏥 프로젝트 소개

조직병리검사대상물 보관/폐기 관리 시스템은 병원 병리과에서 조직검사 검체의 보관 위치를 체계적으로 관리하고, 폐기 프로세스를 효율적으로 처리할 수 있도록 개발된 웹 애플리케이션입니다.

### ✨ 주요 특징

- 🏗️ **유연한 보관 구조**: 구역별 맞춤형 보관 위치 설정
- 📱 **바코드 스캔 지원**: 빠르고 정확한 검체 등록
- 📊 **실시간 통계**: 보관 현황 및 폐기 내역 실시간 모니터링
- 🔍 **직관적 인터페이스**: 사용자 친화적인 트리 구조 네비게이션
- 🛡️ **타입 안전성**: TypeScript 기반의 안정적인 코드 구조

## 🚀 주요 기능

### 📦 보관 관리

- **동적 구역 관리**: 구역 추가/삭제/이름 변경
- **번호 범위 설정**: 각 구역별 보관 위치 개수 조정
- **바코드 스캔**: 검체 바코드를 통한 빠른 등록
- **위치 추적**: 실시간 보관 위치 현황 확인

### 🗑️ 폐기 관리

- **배치 폐기**: 여러 검체 동시 선택 폐기
- **폐기 이력**: 폐기된 검체의 상세 기록 관리
- **위치별 조회**: 특정 보관 위치의 검체 목록 확인

### 📈 통계 및 모니터링

- **실시간 대시보드**: 총 처리 건수, 보관중 검체, 폐기된 검체
- **구역별 현황**: 각 구역의 보관 현황 및 통계
- **처리 내역**: 모든 보관/폐기 활동의 시간순 기록

### 🎛️ 사용자 인터페이스

- **트리 구조 네비게이션**: 폴더형 구역 탐색
- **반응형 디자인**: 다양한 화면 크기 지원
- **실시간 알림**: 작업 결과 즉시 피드백
- **키보드 단축키**: 빠른 작업을 위한 단축키 지원

## 🛠️ 기술 스택

### Frontend
- **React 18.2.0**: 사용자 인터페이스 구축
- **TypeScript 4.7.4**: 타입 안전성 및 개발 효율성
- **Tailwind CSS 3.1.8**: 반응형 스타일링
- **Lucide React**: 아이콘 라이브러리

### 개발 도구
- **pnpm**: 빠른 패키지 관리
- **ESLint**: 코드 품질 관리
- **PostCSS**: CSS 후처리
- **Autoprefixer**: 브라우저 호환성

### 아키텍처 패턴
- **Custom Hooks**: 로직 재사용성
- **Compound Components**: 컴포넌트 조합
- **Function Components**: 현대적 React 패턴

## 📥 설치 및 실행

### 사전 요구사항

- Node.js 16.x 이상
- pnpm (권장) 또는 npm/yarn

### 설치 과정

```bash
# 1. 저장소 클론
git clone https://github.com/your-username/pathology-storage-system.git
cd pathology-storage-system

# 2. pnpm 설치 (글로벌)
npm install -g pnpm

# 3. 의존성 설치
pnpm install

# 4. 개발 서버 실행
pnpm start
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
pnpm run build

# 타입 체크
pnpm run type-check

# 린팅
pnpm run lint

# 린팅 자동 수정
pnpm run lint:fix
```

## 📁 프로젝트 구조

```
pathology-storage-system/
├── public/                 # 정적 파일
├── src/
│   ├── components/         # React 컴포넌트
│   │   └── PathologyStorageSystem.tsx
│   ├── hooks/              # 커스텀 훅
│   │   ├── useNotification.ts
│   │   ├── useZoneManagement.ts
│   │   ├── useItemManagement.ts
│   │   └── index.ts
│   ├── types/              # TypeScript 타입 정의
│   │   └── index.ts
│   ├── utils/              # 유틸리티 함수
│   │   └── index.ts
│   ├── App.tsx             # 메인 앱 컴포넌트
│   ├── index.tsx           # 진입점
│   └── index.css           # 글로벌 스타일
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

### 주요 모듈 설명

#### 🎣 Custom Hooks

- **`useNotification`**: 알림 메시지 상태 관리
- **`useZoneManagement`**: 구역 생성/수정/삭제 로직
- **`useItemManagement`**: 검체 보관/폐기 처리 로직

#### 🧩 Components

- **`PathologyStorageSystem`**: 메인 컴포넌트
- 트리 구조 네비게이션
- 바코드 입력 인터페이스
- 통계 대시보드

#### 🔧 Utils

- 데이터 검증 함수
- 날짜/시간 처리
- 비즈니스 로직 헬퍼

## 📖 사용법

### 1. 구역 관리

```typescript
// 새 구역 추가
const addNewZone = () => {
  // 자동으로 다음 알파벳 할당 (A, B, C...)
  // 최대 26개 구역까지 생성 가능
};

// 구역명 변경
const updateZoneName = (oldZone: string, newZone: string) => {
  // 기존 검체 위치도 자동 업데이트
};
```

### 2. 검체 보관

```typescript
// 바코드 스캔 후 보관
const handleBarcodeSubmit = (barcode: string, location: string) => {
  // 타임스탬프와 함께 검체 정보 저장
  // 실시간 알림 표시
};
```

### 3. 검체 폐기

```typescript
// 다중 선택 폐기
const disposeSelectedItems = (selectedIds: number[]) => {
  // 선택된 검체들을 일괄 폐기 처리
  // 폐기 시간 기록
};
```

## 🔧 개발 가이드

### 환경 설정

```bash
# 개발 환경 변수 설정
cp .env.example .env.local

# 타입 체크 활성화
pnpm run type-check --watch
```

### 코딩 스타일

- **TypeScript Strict Mode** 활성화
- **ESLint 규칙** 준수
- **함수형 컴포넌트** 사용
- **Custom Hooks**로 로직 분리

### 컴포넌트 작성 가이드

```typescript
// 컴포넌트 타입 정의
interface ComponentProps {
  title: string;
  onAction: (id: number) => void;
}

// 함수형 컴포넌트
const Component: React.FC<ComponentProps> = ({ title, onAction }) => {
  // useCallback으로 함수 메모이제이션
  const handleClick = useCallback((id: number) => {
    onAction(id);
  }, [onAction]);

  return <div>{title}</div>;
};
```

### 테스트 작성

```bash
# 테스트 실행
pnpm test

# 커버리지 확인
pnpm test -- --coverage
```

## 📚 API 문서

### 데이터 타입

```typescript
// 검체 아이템
interface ProcessedItem {
  id: number;
  barcode: string;
  mode: 'storage' | 'disposal';
  location: string;
  timestamp: string;
  status: 'stored' | 'disposed';
  disposalTime?: string;
}

// 구역 설정
interface NumberRanges {
  [key: string]: number;
}
```

### 주요 함수

```typescript
// 위치별 검체 수 조회
getStoredCountByLocation(location: string, items: ProcessedItem[]): number

// 검체 폐기 처리
disposeItems(items: ProcessedItem[], selectedIds: number[]): ProcessedItem[]

// 구역명 유효성 검사
isValidZoneName(name: string, existingZones: string[]): boolean
```

## 🤝 기여하기

### 기여 방법

1. **Fork** 저장소
2. **Feature Branch** 생성 (`git checkout -b feature/amazing-feature`)
3. **Commit** 변경사항 (`git commit -m 'Add amazing feature'`)
4. **Push** to Branch (`git push origin feature/amazing-feature`)
5. **Pull Request** 생성

### 코드 리뷰 가이드라인

- [ ] TypeScript 타입 안전성 확인
- [ ] ESLint 규칙 준수
- [ ] 테스트 코드 작성
- [ ] 성능 최적화 고려
- [ ] 접근성 (a11y) 검토

### 이슈 리포팅

버그 리포트나 기능 제안은 [Issues](https://github.com/your-username/pathology-storage-system/issues)를 통해 제출해 주세요.

**Bug Report Template:**
```markdown
## 버그 설명
[버그에 대한 명확한 설명]

## 재현 단계
1. '...'로 이동
2. '....' 클릭
3. '....' 입력
4. 오류 발생

## 예상 동작
[예상했던 동작 설명]

## 실제 동작
[실제 발생한 동작 설명]

## 환경
- OS: [e.g. Windows 10, macOS 13]
- 브라우저: [e.g. Chrome 91, Safari 14]
- Node.js: [e.g. 16.14.0]
```

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

## 🙏 감사의 말

이 프로젝트는 병원 현장의 요구사항을 반영하여 개발되었습니다. 사용해 주시고 피드백을 제공해 주시는 모든 분들께 감사드립니다.

**개발자**: wssin  
**이메일**: wssin.futures@gmail.com

---

<div align="center">

**⭐ 이 프로젝트가 유용했다면 Star를 눌러주세요! ⭐**

</div>