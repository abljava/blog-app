import Post from '@/components/Post/Post';
import Link from 'next/link';

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  // Разворачиваем Promise params
  const { id } = await params;
  const postId = parseInt(id, 10);

  // Проверка валидности ID
  if (isNaN(postId) || postId < 1) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Неверный ID поста</h1>
        <Link href="/">Вернуться на главную</Link>
      </div>
    );
  }

  return <Post postId={postId} />;
}

