## 7. styles 폴더

**styles** 폴더는 **애플리케이션의 스타일**을 관리하는 파일들이 모여 있는 곳입니다. 공통적으로 사용되는 스타일 정의나, 특정 컴포넌트에 적용할 CSS 스타일을 이곳에 저장합니다.

### 역할:

- **공통 스타일 관리**: 전체 애플리케이션에서 사용하는 공통 스타일을 정의합니다.
- **디자인 시스템 관리**: 색상, 폰트 크기, 간격 등 디자인 시스템에 따라 스타일을 정리합니다.
- **모듈화된 스타일 적용**: 각 컴포넌트에 모듈화된 스타일을 적용하여 코드의 가독성을 높입니다.

### 예시:

styles/ └── colors.ts # 색상 팔레트 정의 └── spacing.ts # 여백 및 간격 정의 └── globalStyles.ts # 전체적인 글로벌 스타일 정의
