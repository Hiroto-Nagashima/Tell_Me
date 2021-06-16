[![codecov](https://codecov.io/gh/Hiroto-Nagashima/Tell_Me/branch/develop/graph/badge.svg)](https://codecov.io/gh/Hiroto-Nagashima/Tell_Me)
# Tell Me
## Overview
https://tell-me-please.com/<br>保育園と保護者を繋ぐ連絡帳アプリです。<br>**レスポンシブ未対応のため全画面表示で閲覧してください。**

<img width="835" alt="スクリーンショット 2021-06-16 22 53 54" src="https://user-images.githubusercontent.com/74855940/122232007-e0dfba00-cef5-11eb-8d3a-bc04e3facbc7.png">

## Description
- このアプリのユーザーは保護者と保育園の先生です。
- 保護者のページでできることはおよそ以下の通りです。
  - 子供の登録、子供の情報の更新
  - 連絡帳の登録、更新
  - 保育園の先生からの連絡の閲覧
- 保育園の先生のページでできることはおよそ以下の通りです
  - 在籍している保育園内の全ての子供の閲覧 
  - 保育園からの連絡の投稿

## Setup
```
$ git clone https://github.com/Hiroto-Nagashima/Tell_Me.git
$ cd Tell_Me
$ docker-compose build
$ docker-compose run --rm backend bundle i
$ docker-compose run --rm backend rake db:create
$ docker-compose run --rm backend rake db:migrate
$ docker-compose run --rm backend rake db:seed
$ docker-compose run --rm frontend yarn install
$ docker-compose up

```
http://localhost:3000 でWebpackサーバ, http://localhost:5000 でAPIサーバーが起動します。
**現在、Firebaseに必要なAPI Keyなどが記載されたenvファイルを共有できないため、ローカルで立ち上げられません。対応検討中です**

## Usage
- 保護者の機能を試したい場合はユーザー登録で「私は保護者です」を選択して子供の作成ページに進んでください。
- 保育園の先生の機能を試したい場合はユーザー登録で「私は先生です」を選択した後、保育園のIDを選んでユーザー登録してください。
- 現在、3つの保育園を初期データとして登録しています。そのため保育園のIDも1から3の中から選んでください。

## Technology stack
- frontend
  - React
  - TypeScript
  - styled-components
  - atomic design
- backend
  - Ruby on Rails
  - RSpec
- infra
  - docker-compose
  - Firebase Authentication
  - AWS(ECS, S3, RDS)

## Unit Test

- 以下のコマンドで実行できます
```
$ docker-compose run --rm backend bundle exec rspec
```
## Storybook

- 以下のコマンドで実行できます
```
$ cd frontend
$ yarn storybook
```
