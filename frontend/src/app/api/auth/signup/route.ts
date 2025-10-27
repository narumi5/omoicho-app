import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import type { SignupInput, SignupResponse, ApiResponse } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const body: SignupInput = await request.json();
    const { email, password, name } = body;

    // バリデーション
    if (!email || !password || !name) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'メールアドレス、パスワード、名前は必須です' },
        { status: 400 }
      );
    }

    // メールアドレスの正規化（小文字に統一）
    const normalizedEmail = email.toLowerCase().trim();

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json<ApiResponse<null>>(
        { error: '有効なメールアドレスを入力してください' },
        { status: 400 }
      );
    }

    // パスワードの長さチェック
    if (password.length < 6) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'パスワードは6文字以上で入力してください' },
        { status: 400 }
      );
    }

    // 名前の長さチェック
    if (name.trim().length === 0) {
      return NextResponse.json<ApiResponse<null>>(
        { error: '名前を入力してください' },
        { status: 400 }
      );
    }

    // 既存ユーザーチェック
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'このメールアドレスは既に登録されています' },
        { status: 409 }
      );
    }

    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // ユーザー作成
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        name: name.trim(),
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return NextResponse.json<ApiResponse<SignupResponse>>(
      {
        message: 'ユーザー登録が完了しました',
        data: user
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);

    // Prismaのエラーハンドリング
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string };

      // ユニーク制約違反（念のため）
      if (prismaError.code === 'P2002') {
        return NextResponse.json<ApiResponse<null>>(
          { error: 'このメールアドレスは既に登録されています' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json<ApiResponse<null>>(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
