import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * 日記一覧取得
 * GET /api/diaries?coupleId=xxx&page=1&limit=10
 */
export async function GET(req: NextRequest) {
  try {
    // TODO: 認証実装後にユーザーIDを取得
    const searchParams = req.nextUrl.searchParams;
    const coupleId = searchParams.get('coupleId');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    if (!coupleId) {
      return NextResponse.json({ error: 'coupleId is required' }, { status: 400 });
    }

    // ページネーションの計算
    const skip = (page - 1) * limit;

    // 総件数を取得
    const total = await prisma.diary.count({
      where: {
        coupleId,
      },
    });

    // 日記を取得
    const diaries = await prisma.diary.findMany({
      where: {
        coupleId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
      skip,
      take: limit,
    });

    return NextResponse.json({
      data: diaries,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching diaries:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * 日記作成
 * POST /api/diaries
 */
export async function POST(req: NextRequest) {
  try {
    // TODO: 認証実装後にユーザーIDを取得
    const body = await req.json();
    const { content, authorId, coupleId, images } = body;

    // バリデーション
    if (!content || !authorId || !coupleId) {
      return NextResponse.json(
        { error: 'content, authorId, and coupleId are required' },
        { status: 400 }
      );
    }

    // 画像は最大3枚
    if (images && images.length > 3) {
      return NextResponse.json({ error: 'Maximum 3 images allowed' }, { status: 400 });
    }

    const diary = await prisma.diary.create({
      data: {
        content,
        authorId,
        coupleId,
        images: images || [],
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(diary, { status: 201 });
  } catch (error) {
    console.error('Error creating diary:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
