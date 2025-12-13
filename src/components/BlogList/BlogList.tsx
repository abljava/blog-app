'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useGetPostsQuery } from '@/lib/api';
import Pagination from '../Pagination/Pagination';
import styles from './BlogList.module.scss';
import Link from 'next/link';

const ITEMS_PER_PAGE = 10;
const MAX_PAGES = 10;

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
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', (selected + 1).toString()); // react-paginate использует 0-based индекс
    router.push(`/?${params.toString()}`);
    // Прокрутка вверх при смене страницы
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Вычисляем количество страниц
  // Если вернулось меньше постов чем ITEMS_PER_PAGE, значит это последняя страница
  // Иначе показываем максимум MAX_PAGES страниц
  const isLastPage = posts && posts.length < ITEMS_PER_PAGE;
  let pageCount = MAX_PAGES;
  
  if (isLastPage) {
    // Если это последняя страница, показываем только до текущей страницы
    pageCount = page;
  } else if (page === MAX_PAGES) {
    // Если мы на максимальной странице и получили полную страницу, это может быть не последняя
    // Но по ТЗ показываем максимум 10 страниц
    pageCount = MAX_PAGES;
  }
  
  // Показываем пагинацию только если есть хотя бы 2 страницы
  const shouldShowPagination = pageCount > 1;

  // Функция для обрезки текста до ~150 символов
  const truncateText = (text: string, maxLength: number = 150): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

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
            <p className={styles.excerpt}>{truncateText(post.body)}</p>
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

