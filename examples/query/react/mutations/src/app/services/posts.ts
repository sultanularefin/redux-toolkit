import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Post {
  id: string
  name: string
}

type PostsResponse = Post[];


/*
const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (build) => ({
    // ...endpoints
  }),
})




*/

//Endpoints are just a set of operations that you want to
// perform against your server. You define them as an object using the builder syntax.


//There are two basic endpoint types: **query** and **mutation**.


// query-endpoint-definition

// https://redux-toolkit.js.org/rtk-query/api/createApi#query-endpoint-definition


export const api = createApi({

  // baseQuery(args: InternalQueryArgs, api: BaseQueryApi): any;
  // endpoints(build: EndpointBuilder<InternalQueryArgs, TagTypes>): Definitions;
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Post'], // could be ['Post', 'Users'] etc.
  //endpoints endpont(s) check s,
  endpoints: (build) => ({
    getPosts: build.query<PostsResponse, void>({
      query: () => 'posts',

      /*
    providesTags?: ResultDescription<
    TagTypes,
    ResultType,
    QueryArg,
    BaseQueryError<BaseQuery>>
      */



      /*

      providesTags#
(optional, only for query endpoints)

Used by query endpoints. Determines which 'tag' is attached to the cached data returned by the query. Expects an array of tag type strings, an array of objects of tag types with ids, or a function that returns such an array.

['Post'] - equivalent to 2
[{ type: 'Post' }] - equivalent to 1
[{ type: 'Post', id: 1 }]
(result, error, arg) => ['Post'] - equivalent to 5
(result, error, arg) => [{ type: 'Post' }] - equivalent to 4
(result, error, arg) => [{ type: 'Post', id: 1 }]
       */

      // providesTags: (result) =>


      // const assertions
      // https://stackoverflow.com/questions/66993264/what-does-the-as-const-mean-in-typescript-and-what-is-its-use-case

      // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
      providesTags: (result, error, arg) =>
          result

              ? [
                // ...result.map(({id}) => ({type: 'Post' as const, id})),


               // ...result.map(({id}) => ({type: 'Post' as const, id:id})),

                ...result.map(({id}) => ({type: 'Post' as const, id:id})),
                //  provide tags individual tuple level
                //  (result, error, arg) => [{ type: 'Post', id: 1 }]

                {type: 'Post', id: 'LIST'},
              //adding tag 'Post' with id: 'List' over all the result that have been received for
              // table level// or all post level.

              ]
              : ([{type: 'Post', id: 'LIST'}]
                  //adding tag 'Post' with id: 'List' over all the result that have been received for
                  // TABLE LEVEL// OR ALL POST LEVEL. EVEN IT IS EMPTY
              ),



    }),
    addPost: build.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: `posts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    getPost: build.query<Post, string>({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    updatePost: build.mutation<void, Pick<Post, 'id'> & Partial<Post>>({
      query: ({ id, ...patch }) => ({
        url: `posts/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
    }),
    deletePost: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
  }),
})

export const {
  useGetPostQuery,
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = api



