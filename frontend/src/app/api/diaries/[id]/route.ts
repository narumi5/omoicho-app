import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

/**
 * 日記詳細取得
 * GET /api/diaries/[id]
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = requireAuth(req);
    if (auth.error) return auth.error;
    const { user: payload } = auth;

    const { id } = await params;
    const diary = await prisma.diary.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!diary) {
      return NextResponse.json({ error: 'Diary not found' }, { status: 404 });
    }

    // カップルメンバーかチェック
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || user.coupleId !== diary.coupleId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({
      id: diary.id,
      content: diary.content,
      date: diary.date,
      images: diary.images,
      author: diary.author,
    });
  } catch (error) {
    console.error('Error fetching diary:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * 日記更新
 * PUT /api/diaries/[id]
 */
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { content, images } = body;

    // バリデーション
    if (!content) {
      return NextResponse.json({ error: 'content is required' }, { status: 400 });
    }

    // 画像は最大3枚
    if (images && images.length > 3) {
      return NextResponse.json({ error: 'Maximum 3 images allowed' }, { status: 400 });
    }

    const diary = await prisma.diary.update({
      where: { id },
      data: {
        content,
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

    return NextResponse.json(diary);
  } catch (error) {
    console.error('Error updating diary:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * 日記削除
 * DELETE /api/diaries/[id]
 */
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.diary.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Diary deleted successfully' });
  } catch (error) {
    console.error('Error deleting diary:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
