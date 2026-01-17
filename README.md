# omoicho

## 1. 概要
本リポジトリは、WebアプリケーションをAWS上に構築した際の
インフラ構成をまとめたものです。

- 目的：AWSの基本的な設計・構築スキルの習得
- 想定：小規模Webアプリ
- 重視した点：セキュリティ・可用性・コスト

## 2. 構成図
![architecture](docs/architecture.png)

## 3. AWS構成
- Route 53：ドメイン管理
- EC2：アプリケーション実行
- Elastic IP：固定IP
- RDS：データベース（PostgreSQL）
- VPC：ネットワーク（Public・Private Subnet）
- Security Group：通信制御
- CloudWatch：ログ・監視

## 4. 通信の流れ
1. ユーザーがブラウザからアクセス
2. Route 53でドメイン名を名前解決
3. ユーザーからEC2（Nginx）へHTTPS通信
   - Let’s Encrypt + certbot を使用してSSL証明書を設定
4. Nginxがアプリケーション（EC2上）へリクエストを転送
5. アプリケーションからRDSへデータアクセス

## 5. 工夫した点
- 想定ユーザー数が少ないためALBは導入せず、Let’s Encrypt + certbotでHTTPS対応
- RDSは直接インターネットからアクセス不可
- Route 53 + Elastic IPにより、EC2再起動時も安定したアクセスを維持
