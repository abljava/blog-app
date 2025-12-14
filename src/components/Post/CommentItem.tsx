'use client';

import { Comment } from '@/lib/api';
import styles from './CommentItem.module.scss';

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <article className={styles.comment}>
      <h3 className={styles.name}>{comment.name}</h3>
      <p className={styles.body}>{comment.body}</p>
      <p className={styles.email}>{comment.email}</p>
    </article>
  );
}

