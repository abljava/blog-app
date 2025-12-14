import { Suspense } from 'react';
import BlogList from "@/components/BlogList/BlogList";
import SearchForm from '@/components/SearchForm/SearchForm';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<div>Загрузка...</div>}>
        <SearchForm />
        <BlogList />
      </Suspense>
    </div>
  );
}
