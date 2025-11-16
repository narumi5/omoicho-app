import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 既存のデータを削除
  await prisma.diary.deleteMany();
  await prisma.user.deleteMany();
  await prisma.couple.deleteMany();

  // カップルを作成
  const couple = await prisma.couple.create({
    data: {
      inviteCode: 'TEST-INVITE-CODE-123',
    },
  });

  console.log('Created couple:', couple);

  // パスワードをハッシュ化
  const hashedPassword = await bcrypt.hash('password123', 10);

  // ユーザー1を作成
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: hashedPassword,
      name: 'ユーザー1',
      coupleId: couple.id,
    },
  });

  console.log('Created user1:', user1);

  // ユーザー2を作成
  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      password: hashedPassword,
      name: 'ユーザー2',
      coupleId: couple.id,
    },
  });

  console.log('Created user2:', user2);

  // 日記データを作成
  const diaries = [];
  const diaryContents = [
    '今日は天気が良かったので、公園で散歩しました。桜がとても綺麗でした。',
    'カフェで美味しいコーヒーを飲みました。リラックスできて良かったです。',
    '久しぶりに映画を見ました。感動的なストーリーで涙が出ました。',
    '料理に挑戦してみました。思ったより上手くできて嬉しかったです。',
    '友達と食事に行きました。楽しい時間を過ごせました。',
    '新しい本を読み始めました。とても面白くて一気に読んでしまいそうです。',
    '運動不足解消のためにジョギングをしました。気持ち良かったです。',
    'オンラインで勉強会に参加しました。新しい知識が得られて良かったです。',
    '家族とビデオ通話をしました。元気そうで安心しました。',
    'ゆっくり休日を過ごしました。リフレッシュできました。',
    '美術館に行ってきました。素晴らしい作品をたくさん見ることができました。',
    '新しいレストランに行ってみました。料理がとても美味しかったです。',
    '久しぶりに友人と会いました。昔話に花が咲きました。',
    'ガーデニングを始めました。植物の成長が楽しみです。',
    '音楽ライブに行ってきました。とても盛り上がりました。',
    'DIYで棚を作ってみました。達成感がありました。',
    'ヨガのクラスに参加しました。心身ともにリラックスできました。',
    '新しい趣味としてカメラを始めました。写真を撮るのが楽しいです。',
    '温泉旅行に行ってきました。とてもリフレッシュできました。',
    'ケーキを焼いてみました。家族に喜んでもらえて嬉しかったです。',
  ];

  for (let i = 0; i < 20; i++) {
    const author = i % 2 === 0 ? user1 : user2;
    const date = new Date();
    date.setDate(date.getDate() - i);

    const diary = await prisma.diary.create({
      data: {
        content: diaryContents[i],
        date: date,
        authorId: author.id,
        coupleId: couple.id,
        images: [],
      },
    });

    diaries.push(diary);
  }

  console.log(`Created ${diaries.length} diaries`);
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
