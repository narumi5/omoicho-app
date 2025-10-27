import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// S3クライアントの初期化
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-northeast-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'couple-diary-images';

/**
 * アップロード用の署名付きURLを生成
 * @param coupleId カップルID
 * @param diaryId 日記ID
 * @param filename ファイル名
 * @param expiresIn 有効期限（秒）デフォルト5分
 */
export async function generateUploadUrl(
  coupleId: string,
  diaryId: string,
  filename: string,
  expiresIn: number = 300
): Promise<string> {
  const key = `couple-${coupleId}/diary-${diaryId}/${filename}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: 'image/jpeg', // 必要に応じて変更
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn });
  return uploadUrl;
}

/**
 * 閲覧用の署名付きURLを生成
 * @param key S3オブジェクトキー
 * @param expiresIn 有効期限（秒）デフォルト1時間
 */
export async function generateViewUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  const viewUrl = await getSignedUrl(s3Client, command, { expiresIn });
  return viewUrl;
}

/**
 * 複数の画像の閲覧用URLを一括生成
 */
export async function generateViewUrls(
  keys: string[],
  expiresIn: number = 3600
): Promise<string[]> {
  return Promise.all(keys.map(key => generateViewUrl(key, expiresIn)));
}

/**
 * S3キーがカップルに属しているか検証
 */
export function validateS3Key(key: string, coupleId: string): boolean {
  const expectedPrefix = `couple-${coupleId}/`;
  return key.startsWith(expectedPrefix);
}
