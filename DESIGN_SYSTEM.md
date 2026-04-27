# Forge Design System

게임 토큰 런치패드를 위한 일관된 UI/UX 가이드

---

## 📋 목차

- [Colors](#colors)
  - [Brand Colors](#brand-colors)
  - [Neutral Colors - Dark Theme](#neutral-colors---dark-theme)
  - [Neutral Colors - Light Theme](#neutral-colors---light-theme)
  - [Semantic Colors](#semantic-colors)
- [Typography](#typography)
- [Buttons](#buttons)
- [Icons & Assets](#icons--assets)
- [Spacing](#spacing)
- [Design Principles](#design-principles)

---

## Colors

### Brand Colors

Forge의 핵심 브랜드 컬러입니다.

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Primary Green** | `#56C880` | Main brand color, CTAs, success states |
| **Primary Hover** | `#45B570` | Hover states for primary actions |
| **Dark Background** | `#000000` | Dark mode background |
| **Light Background** | `#F9FAFB` | Light mode background |

#### 사용 예시
```css
/* Primary CTA Button */
background-color: #56C880;

/* Hover State */
background-color: #45B570;
```

---

### Neutral Colors - Dark Theme

다크 테마에서 사용되는 Neutral 컬러 팔레트입니다.

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Gray 950** | `#030712` | Deepest background |
| **Gray 900** | `#111827` | Cards, modals |
| **Gray 800** | `#1F2937` | Hover states |
| **Gray 700** | `#374151` | Borders, dividers |
| **Gray 600** | `#4B5563` | Disabled text |
| **Gray 500** | `#6B7280` | Placeholder text |
| **Gray 400** | `#9CA3AF` | Secondary text |
| **Gray 300** | `#D1D5DB` | Primary text |
| **Gray 200** | `#E5E7EB` | Headings |
| **Gray 100** | `#F3F4F6` | Emphasis text |

#### Tailwind 클래스 매핑
```jsx
// Background
bg-gray-950  // Deepest background
bg-gray-900  // Cards, modals
bg-gray-800  // Hover states

// Text
text-gray-100  // Headings
text-gray-200  // Sub-headings
text-gray-300  // Primary text
text-gray-400  // Secondary text
text-gray-500  // Placeholder
```

---

### Neutral Colors - Light Theme

라이트 테마에서 사용되는 Neutral 컬러 팔레트입니다.

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Gray 900** | `#111827` | Headings |
| **Gray 800** | `#1F2937` | Primary text |
| **Gray 700** | `#374151` | Secondary text |
| **Gray 600** | `#4B5563` | Tertiary text |
| **Gray 500** | `#6B7280` | Placeholder text |
| **Gray 400** | `#9CA3AF` | Disabled text |
| **Gray 300** | `#D1D5DB` | Borders, dividers |
| **Gray 200** | `#E5E7EB` | Hover states |
| **Gray 100** | `#F3F4F6` | Backgrounds |
| **Gray 50** | `#F9FAFB` | Page background |

#### Tailwind 클래스 매핑
```jsx
// Background
bg-gray-50   // Page background
bg-gray-100  // Card backgrounds
bg-gray-200  // Hover states

// Text
text-gray-900  // Headings
text-gray-800  // Primary text
text-gray-700  // Secondary text
text-gray-600  // Tertiary text
```

---

### Semantic Colors

상태와 의미를 전달하는 컬러입니다.

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Success** | `#10B981` | Positive actions, price increases |
| **Warning** | `#F59E0B` | Caution, important notices |
| **Error** | `#EF4444` | Errors, price decreases |
| **Info** | `#3B82F6` | Informational messages |

#### 사용 예시
```jsx
// Success - Buy button, positive change
<Button className="bg-[#10B981] text-white">Buy</Button>
<span className="text-[#10B981]">+12.5%</span>

// Error - Sell button, negative change
<Button className="bg-[#EF4444] text-white">Sell</Button>
<span className="text-[#EF4444]">-8.3%</span>

// Warning - Important notice
<div className="bg-[#F59E0B] bg-opacity-10 border border-[#F59E0B]">
  <p className="text-[#F59E0B]">경고 메시지</p>
</div>

// Info - Informational badge
<span className="bg-[#3B82F6] text-white px-2 py-1 rounded">New</span>
```

---

## Typography

Forge의 타이포그래피 스케일입니다.

### Heading 1
- **Size**: 36px / 2.25rem
- **Weight**: Bold (700)
- **Tailwind**: `text-4xl font-bold`
- **Usage**: 페이지 타이틀, 주요 헤딩

```jsx
<h1 className="text-4xl font-bold text-gray-100">
  Heading 1
</h1>
```

### Heading 2
- **Size**: 30px / 1.875rem
- **Weight**: Bold (700)
- **Tailwind**: `text-3xl font-bold`
- **Usage**: 섹션 타이틀

```jsx
<h2 className="text-3xl font-bold text-gray-100">
  Heading 2
</h2>
```

### Heading 3
- **Size**: 24px / 1.5rem
- **Weight**: Bold (700)
- **Tailwind**: `text-2xl font-bold`
- **Usage**: 서브 섹션 타이틀

```jsx
<h3 className="text-2xl font-bold text-gray-100">
  Heading 3
</h3>
```

### Body Text
- **Size**: 16px / 1rem
- **Weight**: Regular (400)
- **Tailwind**: `text-base`
- **Usage**: 본문 텍스트, 설명

```jsx
<p className="text-base text-gray-300">
  Body text
</p>
```

### Small Text
- **Size**: 14px / 0.875rem
- **Weight**: Regular (400)
- **Tailwind**: `text-sm`
- **Usage**: 보조 정보, 레이블

```jsx
<p className="text-sm text-gray-400">
  Small text
</p>
```

### Extra Small Text
- **Size**: 12px / 0.75rem
- **Weight**: Regular (400)
- **Tailwind**: `text-xs`
- **Usage**: 캡션, 메타 정보

```jsx
<p className="text-xs text-gray-500">
  Extra small text
</p>
```

---

## Buttons

### Primary Button

메인 액션을 위한 버튼입니다.

```jsx
<Button className="bg-[#56C880] hover:bg-[#45B570] text-white">
  Primary Button
</Button>
```

**스타일**:
- Background: `#56C880`
- Hover: `#45B570`
- Text: White
- Padding: `px-4 py-2`
- Border Radius: `rounded-md`

### Secondary Button

보조 액션을 위한 버튼입니다.

```jsx
// Dark Theme
<Button 
  variant="outline"
  className="bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800"
>
  Secondary Button
</Button>

// Light Theme
<Button 
  variant="outline"
  className="bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
>
  Secondary Button
</Button>
```

**스타일 (Dark)**:
- Background: `#111827` (Gray 900)
- Border: `#374151` (Gray 700)
- Text: `#D1D5DB` (Gray 300)
- Hover Background: `#1F2937` (Gray 800)

### Buy Button

토큰 구매를 위한 버튼입니다.

```jsx
<Button className="bg-[#56C880] hover:bg-[#45B570] text-white font-bold">
  Buy
</Button>
```

**스타일**:
- Background: `#56C880` (Primary Green)
- Hover: `#45B570` (Primary Hover)
- Text: White
- Font Weight: Bold (700)

### Sell Button

토큰 판매를 위한 버튼입니다.

```jsx
<Button className="bg-red-500 hover:bg-red-600 text-white font-bold">
  Sell
</Button>
```

**스타일**:
- Background: `#EF4444` (Red 500)
- Hover: `#DC2626` (Red 600)
- Text: White
- Font Weight: Bold (700)

### Disabled State

비활성화된 버튼 상태입니다.

```jsx
<Button 
  className="bg-[#56C880] text-white opacity-50 cursor-not-allowed"
  disabled
>
  Disabled Button
</Button>
```

**스타일**:
- Opacity: `50%`
- Cursor: `not-allowed`
- Pointer Events: `none`

---

## Icons & Assets

### Token Icons

#### CROSS Coin
- **Format**: PNG
- **Size**: 64x64px
- **Usage**: CROSS 토큰 표시, 가격 정보

```jsx
import crossCoin from "figma:asset/431ee8d40726913da14f55c0c2aa3cbb7424b402.png";

<img src={crossCoin} alt="CROSS" className="w-8 h-8" />
```

#### Game Token
- **Format**: PNG
- **Size**: 64x64px (원형)
- **Usage**: 게임 토큰 표시

```jsx
import gameTokenIcon from "figma:asset/ed5cd97fee00ddf5d6d7491bd26eeeb9d3dd3d1e.png";

<img src={gameTokenIcon} alt="Game Token" className="w-8 h-8 rounded-full" />
```

### Icon Library

Lucide React 아이콘을 사용합니다.

```bash
npm install lucide-react
```

**주요 아이콘**:
- `TrendingUp` - 가격 상승
- `TrendingDown` - 가격 하락
- `Search` - 검색
- `Filter` - 필터
- `Copy` - 복사
- `ExternalLink` - 외부 링크
- `ChevronDown` - 드롭다운
- `X` - 닫기

```jsx
import { TrendingUp, Search, Copy } from "lucide-react";

<TrendingUp className="text-[#10B981]" size={20} />
<Search className="text-gray-400" size={18} />
<Copy className="text-gray-500" size={16} />
```

---

## Spacing

Tailwind의 spacing scale을 사용합니다.

| Value | Pixels | Rem | Tailwind Class | Usage |
|-------|--------|-----|----------------|-------|
| 1 | 4px | 0.25rem | `p-1`, `m-1`, `gap-1` | 최소 간격 |
| 2 | 8px | 0.5rem | `p-2`, `m-2`, `gap-2` | 작은 간격 |
| 3 | 12px | 0.75rem | `p-3`, `m-3`, `gap-3` | 아이콘-텍스트 간격 |
| 4 | 16px | 1rem | `p-4`, `m-4`, `gap-4` | 기본 간격 |
| 6 | 24px | 1.5rem | `p-6`, `m-6`, `gap-6` | 카드 내부 패딩 |
| 8 | 32px | 2rem | `p-8`, `m-8`, `gap-8` | 섹션 간격 |
| 12 | 48px | 3rem | `p-12`, `m-12`, `gap-12` | 큰 섹션 간격 |
| 16 | 64px | 4rem | `p-16`, `m-16`, `gap-16` | 페이지 레벨 간격 |

### 사용 예시

```jsx
// Card with padding
<Card className="p-6">
  {/* 24px padding on all sides */}
</Card>

// Section spacing
<section className="mb-8">
  {/* 32px margin bottom */}
</section>

// Grid gap
<div className="grid grid-cols-3 gap-4">
  {/* 16px gap between items */}
</div>

// Icon and text spacing
<div className="flex items-center gap-2">
  <Icon size={16} />
  <span>Text</span>
  {/* 8px gap between icon and text */}
</div>
```

---

## Design Principles

### 1. Gaming Identity

**원칙**: 게임 플랫폼 스타일의 디자인 정체성 강조

- Steam, Epic Games와 같은 게임 플랫폼의 시각적 언어 차용
- 다크 테마를 기본으로 하여 게이밍 경험 제공
- 선명한 그린 컬러(`#56C880`)로 게임 토큰의 활력 표현
- 토큰 아이콘과 게임 에셋을 적극 활용

**적용 예시**:
```jsx
// Dark gaming aesthetic
<div className="bg-black text-gray-100">
  <Card className="bg-gray-900 border border-gray-800">
    {/* Gaming-style card */}
  </Card>
</div>
```

### 2. Consistent Metrics

**원칙**: CROSS 메트릭 표시 방식 통일

모든 CROSS 관련 메트릭은 다음 형식을 따릅니다:
- **CROSS 아이콘** + **숫자** + **USD 병기**

**적용 예시**:
```jsx
// Market Cap
<div className="flex items-center gap-2">
  <img src={crossCoin} alt="CROSS" className="w-5 h-5" />
  <span className="font-bold">1,234,567 CROSS</span>
  <span className="text-gray-400 text-sm">($123,456.78)</span>
</div>

// Price
<div className="flex items-center gap-2">
  <img src={crossCoin} alt="CROSS" className="w-4 h-4" />
  <span>0.1 CROSS</span>
  <span className="text-gray-500 text-xs">($0.10)</span>
</div>
```

**주의사항**:
- Market Cap (MC)은 항상 CROSS 기준으로 표시
- USD는 보조 정보로만 사용
- 아이콘은 항상 왼쪽에 배치

### 3. Brand Color

**원칙**: 56C880 그린을 메인 브랜드 컬러로 사용

- Primary Action (CTA, Buy 버튼)에 사용
- 성공 상태 및 긍정적 변화 표시
- 브랜드 아이덴티티 강화
- Hover 시 `#45B570`으로 변경

**적용 가이드**:

✅ **DO**:
```jsx
// Primary CTA
<Button className="bg-[#56C880] hover:bg-[#45B570]">
  Create Token
</Button>

// Success indicator
<span className="text-[#56C880]">+12.5%</span>

// Active state
<div className="border-2 border-[#56C880]">
  Active Item
</div>
```

❌ **DON'T**:
```jsx
// ❌ 너무 많은 그린 사용
<div className="bg-[#56C880]">
  <h1 className="text-[#56C880]">Title</h1>
  <p className="text-[#56C880]">Text</p>
</div>

// ❌ 에러 상태에 그린 사용
<span className="text-[#56C880]">Error!</span>
```

---

## Responsive Breakpoints

Tailwind의 기본 breakpoint를 사용합니다.

| Breakpoint | Min Width | Prefix | Devices |
|------------|-----------|--------|---------|
| **Mobile** | 0px | (none) | 스마트폰 (세로) |
| **SM** | 640px | `sm:` | 스마트폰 (가로), 작은 태블릿 |
| **MD** | 768px | `md:` | 태블릿 |
| **LG** | 1024px | `lg:` | 데스크톱 |
| **XL** | 1280px | `xl:` | 큰 데스크톱 |
| **2XL** | 1536px | `2xl:` | 대형 모니터 |

### 사용 예시

```jsx
// Responsive padding
<div className="px-4 sm:px-6 lg:px-8">
  {/* Mobile: 16px, Tablet: 24px, Desktop: 32px */}
</div>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
</div>

// Responsive text
<h1 className="text-2xl sm:text-3xl lg:text-4xl">
  {/* Mobile: 24px, Tablet: 30px, Desktop: 36px */}
</h1>
```

---

## Component Examples

### Token Card

```jsx
<Card className="bg-gray-900 hover:bg-gray-800 transition-colors cursor-pointer">
  <div className="p-4">
    {/* Header */}
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <img src={tokenIcon} alt="Token" className="w-10 h-10 rounded-full" />
        <div>
          <h3 className="font-bold text-gray-100">Token Name</h3>
          <p className="text-xs text-gray-500">Creator</p>
        </div>
      </div>
      <span className="text-[#10B981] text-sm">+12.5%</span>
    </div>

    {/* Market Cap */}
    <div className="mb-2">
      <p className="text-xs text-gray-500 mb-1">Market Cap</p>
      <div className="flex items-center gap-2">
        <img src={crossCoin} alt="CROSS" className="w-4 h-4" />
        <span className="font-bold text-gray-200">123,456 CROSS</span>
        <span className="text-gray-500 text-sm">($12,345.67)</span>
      </div>
    </div>

    {/* Progress Bar */}
    <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
      <div 
        className="bg-[#56C880] h-2 rounded-full" 
        style={{ width: '75%' }}
      />
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between text-xs text-gray-500">
      <span>Progress: 75%</span>
      <span>2h 30m left</span>
    </div>
  </div>
</Card>
```

### Price Display

```jsx
<div className="flex items-center gap-3">
  {/* Current Price */}
  <div>
    <p className="text-xs text-gray-500 mb-1">Current Price</p>
    <div className="flex items-center gap-2">
      <img src={crossCoin} alt="CROSS" className="w-5 h-5" />
      <span className="text-xl font-bold text-gray-100">0.1 CROSS</span>
      <span className="text-gray-400 text-sm">($0.10)</span>
    </div>
  </div>

  {/* Price Change */}
  <div className="flex items-center gap-1">
    <TrendingUp className="text-[#10B981]" size={16} />
    <span className="text-[#10B981] font-semibold">+12.5%</span>
  </div>
</div>
```

### Search Bar

```jsx
<div className="relative">
  <Search 
    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
    size={18} 
  />
  <input
    type="text"
    placeholder="Search tokens..."
    className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#56C880]"
  />
</div>
```

---

## Accessibility

### Color Contrast

모든 텍스트는 WCAG 2.1 AA 기준을 충족합니다:

- **Normal Text**: 최소 4.5:1 대비
- **Large Text** (18px+ 또는 14px+ Bold): 최소 3:1 대비

### Keyboard Navigation

- 모든 인터랙티브 요소는 키보드로 접근 가능
- Tab 순서는 논리적 흐름을 따름
- Focus 상태는 명확하게 표시

```jsx
<Button className="focus:ring-2 focus:ring-[#56C880] focus:ring-offset-2 focus:ring-offset-gray-900">
  Accessible Button
</Button>
```

### Screen Reader

- 모든 이미지는 적절한 `alt` 속성 포함
- 아이콘 버튼은 `aria-label` 사용
- 상태 변화는 `aria-live` 영역으로 알림

```jsx
<button aria-label="Close dialog">
  <X size={20} />
</button>

<div role="status" aria-live="polite">
  {message}
</div>
```

---

## Version History

### v1.0.0 (2026-01-07)
- 초기 디자인 시스템 구축
- 브랜드 컬러 정의
- 타이포그래피 스케일 확립
- 버튼 컴포넌트 스타일 가이드
- Dark/Light 테마 지원
- 반응형 브레이크포인트 정의

---

## Resources

### Tools
- [Figma Make](https://app-hwoebg45w6pga2kxyxfp4gsreppw4yduqjlna75af3vl4pi3zt3a.makeproxy-c.figma.site) - 디자인 시스템 프리뷰
- [Tailwind CSS v4](https://tailwindcss.com) - CSS 프레임워크
- [Lucide Icons](https://lucide.dev) - 아이콘 라이브러리

### Related Pages
- `/design` - 라이브 디자인 시스템 페이지
- `/explore` - Explore 페이지 (토큰 카드 예시)
- `/create` - Create Token 페이지 (폼 컴포넌트 예시)

---

**Last Updated**: 2026년 1월 7일  
**Maintained by**: Forge Design Team  
**License**: Internal Use Only
