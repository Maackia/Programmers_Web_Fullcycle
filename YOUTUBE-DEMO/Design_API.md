# Users API

## 로그인

### POST /login

-   req : body (email, pwd)
-   res : $(name)님 환영합니다. => Main Page

## 회원가입

### POST /register

-   SQL : INSERT
-   req : body (email, pwd, name)
-   res : $(name)님 환영합니다. => Login Page

## 회원 개별 조회

### GET /users

-   SQL : SELECT
-   req : URL (email)
-   res : email, name

## 회원 탈퇴

### DELETE /users

-   SQL : DELETE
-   req : URL(email)
-   res : $(name)님의 계정 탈퇴가 완료되었습니다. => Main Page

# Channels API

## 채널 생성

### POST /channels

-   SQL : INSERT
-   req : body (name, user_id)
-   res : 채널 생성 완료

## 채널 개별 수정

### PUT /channels/:id

-   SQL : UPDATE
-   req : URL (id), body (name)
-   res : 채널 수정 완료

## 채널 개별 삭제

### DELETE /channels/:id

-   SQL : DELETE
-   req : URL (id)
-   res : 채널 삭제 완료

## 채널 전체 조회

### GET /channels

-   SQL : SELECT
-   req : body (user_id)
-   res : 채널 전체 데이터

## 채널 개별 조회

### GET /channels/:id

-   SQL : SELECT
-   req : URL (id)
-   res : 채널 개별 데이터
