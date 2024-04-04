## 데모
[next-instagram-sage.vercel.app](https://next-instagram-sage.vercel.app/)

## 기술스택 & 기능
### Framework
 - [Next.js](https://nextjs.org/)  – Vercel에서 만든 React.js 기반 프레임워크
 - [Auth.js](https://authjs.dev/)  – OAuth(구글 등) 로그인을 지원하는 인증 라이브러리

### Backend
 - [Sanity](https://www.sanity.io/) - headless CMS

### UI
 - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
 - [React Icons](https://react-icons.github.io/react-icons/) - ES6 imports를 활용하는 아이콘 서비스

### Platforms
 - [Vercel](https://vercel.com/home)  – Next.js 애플리케이션 배포 서비스


### 디렉토리 구조
```
src
 ┣ app # 페이지
 ┣ components # 공통 컴포넌트
 ┣ context # 전역 context 관련
 ┣ hooks # react hooks
 ┣ model # 타입 정의
 ┣ pages # next-auth 인증 관련
 ┃ ┗ api
 ┣ service # sanity client
 ┗ util
```
