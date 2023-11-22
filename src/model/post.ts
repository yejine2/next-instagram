export type Comment = {
  comment: string;
  username: string;
  image: string;
};

// 타임라인 포스트
export type SimplePost = Omit<FullPost, "comments"> & {
  comments: number;
};

// 상세 포스트
export type FullPost = {
  id: string;
  username: string;
  userImage: string;
  image: string;
  text: string;
  createdAt: string;
  likes: string[];
  comments: Comment[];
};
