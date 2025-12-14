'use client';

import { useGetPostQuery, useGetPostCommentsQuery } from '@/lib/api';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { createPostsUrl } from '@/lib/utils';
import styles from './Post.module.scss';
import CommentsList from './CommentsList';

interface PostProps {
  postId: number;
}

export default function Post({ postId }: PostProps) {
  const searchParams = useSearchParams();
  
  // Сохраняем параметры поиска для возврата
  const search = searchParams.get('search') || undefined;
  const page = parseInt(searchParams.get('page') || '1', 10);
  
  // Загружаем данные поста
  const { data: post, isLoading: postLoading, error: postError } = useGetPostQuery(postId);
  
  // Загружаем комментарии поста
  const { data: comments, isLoading: commentsLoading, error: commentsError } = useGetPostCommentsQuery(postId);

  const backUrl = createPostsUrl(search, page);

  if (postLoading) {
    return (
      <div className={styles.postContainer}>
        <div className={styles.loading}>Загрузка поста...</div>
      </div>
    );
  }

  if (postError) {
    return (
      <div className={styles.postContainer}>
        <div className={styles.error}>
          Ошибка при загрузке поста. Попробуйте обновить страницу.
        </div>
        <Link href={backUrl} className={styles.backButton}>
          ← Назад к списку
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.postContainer}>
        <div className={styles.empty}>Пост не найден</div>
        <Link href={backUrl} className={styles.backButton}>
          ← Назад к списку
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.postContainer}>
      <Link href={backUrl} className={styles.backButton}>
        ← Назад к списку
      </Link>

      <article className={styles.post}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.body}>{post.body}</div>
      </article>

      <div className={styles.commentsSection}>
        <h2 className={styles.commentsTitle}>Комментарии</h2>
        <CommentsList 
          comments={comments || []} 
          isLoading={commentsLoading}
          error={commentsError}
        />
      </div>
    </div>
  );
}

