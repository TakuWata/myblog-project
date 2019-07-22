## Applicationの概要
- 会員登録すれば誰でも投稿可能なBlogサイト
(現在一時的にサーバー停止中）

## Applicationの機能一覧
- Sign Up/Login/認証機能
- 記事投稿機能
- 記事編集・削除機能
- 記事一覧表示
- 記事詳細表示

## 使用している技術一覧
- Frontend
  - React/Redux
  - Axiosを用いてサーバーサイドのDBにおけるCRUDの実行
  - redux-thunkを用いたasync actionの実行
  - react-router-domを用いたルーティング
  - facebook社のDraft.jsをeditorとして使用
  - mement jsで日付のフォーマッティング
  - redux-form
  - semantic-uiをcssフレームワークとして利用
  - yarnでパッケージ管理
- Backend
  - Django 2.0
  - MySQLをDBとして使用
  - Django restframeworkを使用してAPI(endpoint)を出力
  - DBのリレーションを設計し、migrationを用いて、modelを作成
  - django rest authを用いた認証機能の実装
  - fixtureを用いてDBに仮データを導入
  - Gunicorn x nginxを用いて本番サーバーへデプロイ
  - AWS/EC2を用いてホスティング
