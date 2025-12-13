import BlogList from "@/components/BlogList/BlogList";
import SearchForm from '@/components/SearchForm/SearchForm';



export default function Home() {
  return (
    <div>
      <SearchForm />
      <BlogList />

    </div>
  );
}
