## Login

### POST /login

-   req : body (id, pwd)
-   res : $(name)님 환영합니다. => Main Page

## Register

### POST /register

-   req : body (id, pwd, name)
-   res : $(name)님 환영합니다. => Login Page

## User Info

### GET /user/:id

-   req : URL (id)
-   res : id, name

## 회원 탈퇴

### DELETE /user/:id

-   req : URL(id)
-   res : $(name)님의 계정 탈퇴가 완료되었습니다. => Main Page
