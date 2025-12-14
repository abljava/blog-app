/**
 * Обрезает текст до указанной длины
 */
export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Создает URL с параметрами поиска и пагинации
 */
export function createPostsUrl(
  search?: string,
  page: number = 1,
  basePath: string = '/'
): string {
  const params = new URLSearchParams();
  
  if (search && search.trim()) {
    params.set('search', search.trim());
  }
  
  if (page > 1) {
    params.set('page', page.toString());
  }
  
  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

