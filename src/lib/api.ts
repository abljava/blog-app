import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface GetPostsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ['Post', 'Comment'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], GetPostsParams>({
      query: ({ page = 1, limit = 10, search }) => {
        const params = new URLSearchParams();
        
        // Пагинация на стороне API
        params.append('_page', page.toString());
        params.append('_limit', limit.toString());
        
        // Поиск на стороне API
        if (search && search.trim()) {
          params.append('title_like', search.trim());
        }
        
        return `/posts?${params.toString()}`;
      },
      providesTags: ['Post'],
    }),
    getPost: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    getPostComments: builder.query<Comment[], number>({
      query: (postId) => `/posts/${postId}/comments`,
      providesTags: (result, error, postId) => [
        { type: 'Comment', id: postId },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetPostCommentsQuery,
} = blogApi;

