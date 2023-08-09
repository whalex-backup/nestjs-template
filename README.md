# Nestjs-template

## Overview

- Nestjs + DDD + Hexagon 으로 만들어진 템플릿이며, 해당 템플릿은 [Domain-driven-hexagon](https://github.com/Sairyss/domain-driven-hexagon) 프로젝트를 참조해서 만들었습니다.

## 기술 스택

- typeorm
- nestjs
- swagger
- jest

## 폴더 import 경로

- `@src` => /src
- `@common` => /src/common
- `@modules` => /src/modules
- `@tests` => /tests

_필요시 각 프로젝트에 맞게 수정하시면 됩니다._

## common 디렉터리

- modules 폴더에서 공통으로 사용하는 파일들 및 미들웨어 처리를 하는 파일들이 모여있는 곳입니다.
- 객체를 인스턴스화하기 전 상속을 받는다거나 또는 helper 처럼 사용하고 있습니다.

### `/api 디렉터리`

- In Adapter 에서 공통으로 사용하는 Response 및 Base Class 파일일들이 모여있는 곳입니다.

### `/application`

- 애플리케이션이 실행하면서 요청, 에러, 응답 등 중간에 처리하는 파일들이 모여있는 곳입니다.

### `/db`

- Out Adapter 에서 Repository를 구현할시 필요한(상속 등) Base Class 파일들이 모여있는 곳입니다.

### `/ddd`

- Domain 관련해서 Base Class 파일들이 모여있는 곳입니다.

### `/exceptions`

- 에러 코드, Custom 에러를 구현시 필요한 Base Class들이 모여있는 곳입니다.

### `/guards`

- Auth Guard 등

### `/types`

- type 또는 interface 파일들이 모여있는 곳입니다.

### `/utils`

- 전역에서 사용하는 파일들이 모여있는 곳입니다.

## modules 디렉터리

- example 폴더 안에 user 모듈에 대한 예시 코드를 적어 놨으니 참고 부탁드립니다.
- 각 모듈의 이름은 도메인의 중요한 개념을 반영해야하 합니다.
- 변화하는것들은 한 모듈에 모여있어야 응집도가 올라갑니다.
- 모듈은 작게 유지해야 합니다.

### `/commands`

- CQRS 패턴에 따라 상태를 변경과 관련된 In Adapter 들을 모은 곳입니다.

### `/queries`

- CQRS 패턴에 따라 읽기와 관련된 In Adapter 들을 모은 곳입니다.

### `/domain`

- DOMAIN에 관련된 Domain Logic, Domain Event, VO(Value Object)를 모아 놓은 곳입니다.

### `/dtos`

- DTO들을 모아 놓은 곳입니다.
- ex: response.dto.ts

### `/out`

- Out Adapter에 관련된 파일들을 모아 놓은 곳입니다.
- ex: API, DB 등

## Issue

- 구조에 관련해서 수정 및 추가 사항이 있을시 `Issues` 통해서 문의
