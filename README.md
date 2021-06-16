[![codecov](https://codecov.io/gh/Hiroto-Nagashima/Tell_Me/branch/develop/graph/badge.svg)](https://codecov.io/gh/Hiroto-Nagashima/Tell_Me)
# Tell Me
## Overview

保育園と保護者を繋ぐ連絡アプリです。

## Description

- 子供の体温や機嫌などを記した連絡帳を記録するだけでなく、保育園からのお知らせを見ることができる伝言板としても機能します。
- SwaggerでREST APIを設計しています

## Setup
```
$ git clone git clone https://github.com/Hiroto-Nagashima/Tell_Me.git
$ cd Tell_Me
$ docker-compose build
$ docker-compose run --rm backend bundle i
$ docker-compose run --rm backend rake db:create
$ docker-compose run --rm backend rake db:migrate
$ docker-compose run --rm backend rake db:seed
$ docker-compose run --rm frontend yarn install
$ docker-compose up
```
http://localhost:8000 でWebpackサーバ, http://localhost:3000 でAPIサーバーが起動します

## Technology stack
- frontend
  - React
  - TypeScript
  - styled-components
  - atomic design
- backend
  - Ruby on Rails
  - RSpec

## Unit Test

- 以下のコマンドで実行できます
```
$ docker-compose run --rm app bundle exec rspec
```
## Storybook
- atomic designに基づきコンポーネントを設計しました。全コンポーネントのうち、atoms、molecules、organismsに該当するコンポーネントのStorybookを作成しています。
- 以下のコマンドで実行できます
```
$ cd frontend
$ yarn storybook
```
