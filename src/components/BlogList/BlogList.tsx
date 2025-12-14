'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useGetPostsQuery } from '@/lib/api';
import { ITEMS_PER_PAGE, MAX_PAGES, TRUNCATE_LENGTH } from '@/lib/constants';
import { truncateText, createPostsUrl } from '@/lib/utils';
import Pagination from '../Pagination/Pagination';
import styles from './BlogList.module.scss';
import Link from 'next/link';

export default function BlogList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Читаем параметры из URL
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || undefined;
  
  // Запрос к API с параметрами из URL
  const { data: posts, isLoading, error, isFetching } = useGetPostsQuery({
    page,
    limit: ITEMS_PER_PAGE,
    search,
  });

  // Обработка клика по странице пагинации
  const handlePageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1; // react-paginate использует 0-based индекс
    router.push(createPostsUrl(search, newPage));
    // Прокрутка вверх при смене страницы
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Вычисляем количество страниц (максимум MAX_PAGES)
  // Если вернулось меньше постов чем ITEMS_PER_PAGE, значит это последняя страница
  // Если мы на странице MAX_PAGES, то это последняя доступная страница
  const isLastPage = posts && posts.length < ITEMS_PER_PAGE;
  const pageCount = (isLastPage || page >= MAX_PAGES) ? page : MAX_PAGES;
  const shouldShowPagination = pageCount > 1;

  if (isLoading || isFetching) {
    return (
      <div className={styles.blogList}>
        <div className={styles.loading}>Загрузка постов...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.blogList}>
        <div className={styles.error}>
          Ошибка при загрузке постов. Попробуйте обновить страницу.
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className={styles.blogList}>
        <div className={styles.empty}>
          {search ? 'Посты не найдены по вашему запросу' : 'Посты не найдены'}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.blogList}>
      <div className={styles.posts}>
        {posts.map((post) => (
          <article key={post.id} className={styles.post}>
            <Link href={`/posts/${post.id}`} className={styles.postLink}>
              <h2 className={styles.title}>{post.title}</h2>
            </Link>
            <p className={styles.excerpt}>{truncateText(post.body, TRUNCATE_LENGTH)}</p>
          </article>
        ))}
      </div>

      {shouldShowPagination && (
        <Pagination
          pageCount={pageCount}
          onPageChange={handlePageChange}
          currentPage={page - 1} // react-paginate использует 0-based индекс
        />
      )}
    </div>
  );
}

