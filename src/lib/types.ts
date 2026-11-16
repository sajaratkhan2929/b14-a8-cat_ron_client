export const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"] as const;

export type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  addedBy: { name: string; email: string };
  createdAt: string;
};