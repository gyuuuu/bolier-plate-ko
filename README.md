# bolier-plate-ko

bolier plate : 웹 사이트를 만들 때 어디에든 들어가는 필수적이고 자주 쓰이는 기능을 재사용 할 수 있도록 만들어놓은 코드들.   
               다른 프로젝트를 만들 때 쉽게 재사용 가능
               
## 지금까지 구현된 기능   
### Back-End
  1. 회원가입
  2. 로그인
  3. 로그인시 비밀번호 암호화하여 저장
  4. Auth- 토큰 생성
  5. 로그아웃
  
### Front-End
  1. 페이지간 이동 - React Router Dom
  
**Node.js, Express JS, Mongo DB**   
**React** 사용

<hr/>

## Front-End directory 구조

> _actions , _reducer 
> > Redux 를 위한 폴더들

> components/views 
> > 이 안에는 Page들을 넣는다

> components/views/Sections 
> > 이 안에는 해당 페이지에 관련된 css 파일이나, component 들을 넣는다.

> App.js  
> > Routing 관련 일을 처리한다.

> Config.js 
> > 환경 변수같은 것들을 정하는 곳이다.

> hoc
> > Higher Order Component의 약자(auth에 사용)

> utils
> > 여러 군데에서 쓰일수 있는 것들을 이곳에 넣어둬서 어디서든 쓸수 있게 해줌
