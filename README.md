[![codecov](https://codecov.io/gh/Hiroto-Nagashima/Tell_Me/branch/develop/graph/badge.svg)](https://codecov.io/gh/Hiroto-Nagashima/Tell_Me)
# Tell Me
## Overview

保育園と保護者を繋ぐ連絡アプリです。

## Description

- 子供の体温や機嫌などを記した連絡帳を記録するだけでなく、保育園からのお知らせを見ることができる伝言板としても機能します。
- SwaggerでREST APIを設計しています

## Setup
```
$ docker-compose build
$ docker-compose up
```
http://localhost:3000 でAPIサーバとWebpackサーバが起動します

## Technology stack
- frontend
  - React
  - TypeScript
- backend
  - Ruby on Rails
- style
  - styled-components
- test
  - RSpec
  - jest
- infrastructure
  - Docker
  - AWS ECS
- database
  - MySQL



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