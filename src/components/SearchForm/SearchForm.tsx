'use client';

import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { createPostsUrl } from '@/lib/utils';
import styles from './SearchForm.module.scss';

interface SearchFormData {
  search: string;
}

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchFormData>({
    defaultValues: {
      search: currentSearch,
    },
  });

  // Синхронизируем форму с URL при изменении параметров
  useEffect(() => {
    reset({ search: currentSearch });
  }, [currentSearch, reset]);

  const onSubmit = (data: SearchFormData) => {
    const searchValue = data.search.trim() || undefined;
    router.push(createPostsUrl(searchValue, 1));
  };

  const handleClear = () => {
    reset({ search: '' });
    router.push(createPostsUrl(undefined, 1));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.searchForm}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          {...register('search')}
          placeholder="Поиск по названию поста..."
          className={styles.searchInput}
        />
        {errors.search && (
          <span className={styles.error}>{errors.search.message}</span>
        )}
      </div>
      
      <div className={styles.buttons}>
        <button type="submit" className={styles.submitButton}>
          Найти
        </button>
        {currentSearch && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
          >
            Очистить
          </button>
        )}
      </div>
    </form>
  );
}

