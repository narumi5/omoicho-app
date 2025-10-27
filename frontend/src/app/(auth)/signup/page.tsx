"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import type { SignupInput, SignupResponse, ApiResponse } from "@/types/api";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // パスワード確認チェック
    if (password !== confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }

    setLoading(true);

    try {
      const signupData: SignupInput = {
        name,
        email,
        password,
      };

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const result: ApiResponse<SignupResponse> = await response.json();

      if (!response.ok) {
        setError(result.error || "登録に失敗しました");
        setLoading(false);
        return;
      }

      // 成功時はホームページへリダイレクト
      router.push("/");
    } catch (err) {
      console.error("Signup error:", err);
      setError("通信エラーが発生しました");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-pink flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* サインアップフォーム */}
        <Card className="w-full">
          <h1 className="text-3xl font-bold text-center text-primary mb-8">
            新規登録
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 名前 */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                名前
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="山田太郎"
                required
              />
            </div>

            {/* メールアドレス */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                メールアドレス
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>

            {/* パスワード */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                パスワード
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="6文字以上"
                minLength={6}
                required
              />
            </div>

            {/* パスワード確認 */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                パスワード（確認）
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="パスワードを再入力"
                minLength={6}
                required
              />
            </div>

            {/* 送信ボタン */}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "登録中..." : "登録する"}
            </Button>
          </form>

          {/* ログインリンク */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              すでにアカウントをお持ちの方は{" "}
              <Link
                href="/login"
                className="text-primary hover:underline font-semibold"
              >
                ログイン
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
