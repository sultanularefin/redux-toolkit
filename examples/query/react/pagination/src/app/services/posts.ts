import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postStatuses = ['draft', 'published', 'pending_review'] as const

export interface Post {
  id: string
  title: string
  author: string
  content: string
  status: typeof postStatuses[number]
  created_at: string
  updated_at: string
}

interface ListResponse<T> {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: T[]
}

//import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// only these 2 are imported.

// https://jsonplaceholder.typicode.com/posts
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (build) => ({
    listPosts: build.query<ListResponse<Post>, number | void>({
      query: (page = 1) => `posts?page=${page}`,

      // query: (page = 1) => `posts`,
    }),
  }),
})

export const { useListPostsQuery } = api
