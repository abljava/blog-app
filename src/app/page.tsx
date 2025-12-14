import BlogList from "@/components/BlogList/BlogList";
import SearchForm from '@/components/SearchForm/SearchForm';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <SearchForm />
      <BlogList />
    </div>
  );
}
