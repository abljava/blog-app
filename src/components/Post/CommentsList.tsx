'use client';

import { Comment } from '@/lib/api';
import styles from './CommentsList.module.scss';
import CommentItem from './CommentItem';

interface CommentsListProps {
  comments: Comment[];
  isLoading: boolean;
  error: any;
}

export default function CommentsList({ comments, isLoading, error }: CommentsListProps) {
  if (isLoading) {
    return <div className={styles.loading}>Загрузка комментариев...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка при загрузке комментариев</div>;
  }

  if (!comments || comments.length === 0) {
    return <div className={styles.empty}>Комментариев пока нет</div>;
  }

  return (
    <div className={styles.commentsList}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

