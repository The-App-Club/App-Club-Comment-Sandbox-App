export type Comment = {
  userName: string;
  avatorURL: string;
  parentCommentId: number | null;
  commentId: number;
  createdAt: string;
  updatedAt: string;
  text: string;
  likedCount: number;
  userId: string;
};
