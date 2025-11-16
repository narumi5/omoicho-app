// データベースモデルの型定義

export interface User {
  id: string;
  email: string;
  name: string;
  coupleId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Couple {
  id: string;
  inviteCode: string;
  createdAt: Date;
  users?: User[];
}

export interface Diary {
  id: string;
  content: string;
  date: Date;
  images: string[];
  authorId: string;
  author?: {
    id: string;
    name: string;
  };
  coupleId: string;
  createdAt: Date;
  updatedAt: Date;
}
