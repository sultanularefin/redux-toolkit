import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  List,
  ListIcon,
  ListItem,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  useToast,
} from '@chakra-ui/react'
import { MdBook } from 'react-icons/md'
import React, { useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import {
  Post,
  useAddPostMutation,
  useGetPostsQuery,
} from '../../app/services/posts'
import { PostDetail } from './PostDetail'

const AddPost = () => {
  const initialValue = { name: '' }

  // From T pick a set of properties K

  // declare function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K>;
  // const nameAndAgeOnly = pick(person, "name", "age"); // { name: string, age: number }


      /*

      export interface Post {
  id: string
  name: string
}
  */
  const [post, setPost] = useState<Pick<Post, 'name'>>(initialValue);
  const [addPost, { isLoading }] = useAddPostMutation();
  const toast = useToast();

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {

    console.log("target.value: ", target.value);
    console.log("target.name: ", target.name);
    setPost((prev) => //{
      ({
      ...prev,
      [target.name]: target.value,
    })

  // }

    )

  }

  const handleAddPost = async () => {
    try {
      // const [post, setPost] = useState<Pick<Post, 'name'>>(initialValue);
      // /home/taxi/Programs/byvl/RTkForkedJuly252021/examples/query/react/mutations/node_modules/@reduxjs/toolkit/dist/query/core/buildInitiate.d.ts

      /*

       /**
     * Unwraps a mutation call to provide the raw response/error.
     *
     * @remarks
     * If you need to access the error or success payload immediately after a mutation, you can chain .unwrap().
     *
     * @example
     * ```ts
     * // codeblock-meta title="Using .unwrap"
     * addPost({ id: 1, name: 'Example' })
     *   .unwrap()
     *   .then((payload) => console.log('fulfilled', payload))
     *   .catch((error) => console.error('rejected', error));
     * ```
     *
     * @example
     * ```ts
     * // codeblock-meta title="Using .unwrap with async await"
     * try {
     *   const payload = await addPost({ id: 1, name: 'Example' }).unwrap();
     *   console.log('fulfilled', payload)
     * } catch (error) {
     *   console.error('rejected', error);
     * }
     * ```
     */


      console.log("post: (does it have an id :", post);

      await addPost(post).unwrap();
      //

      // post --is - body
      /**
       addPost: build.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: `posts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
       */

      setPost(initialValue);
    } catch {
      toast({
        title: 'An error occurred',
        description: "We couldn't save your post, try again!",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex p={5}>
      <Box flex={10}>
        <FormControl isInvalid={Boolean(post.name.length < 3 && post.name)}>
          <FormLabel htmlFor="name">Post name</FormLabel>
          <Input
            id="name"
            name="name"
            placeholder="Enter post name"
            value={post.name}
            onChange={handleChange}
          />
        </FormControl>
      </Box>
      <Spacer />
      <Box>
        <Button
          mt={8}
          colorScheme="purple"
          isLoading={isLoading}
          onClick={handleAddPost}
        >
          Add Post
        </Button>
      </Box>
    </Flex>
  )
}

const PostList = () => {
  const { data: posts, isLoading } = useGetPostsQuery()
  const { push } = useHistory()

  if (isLoading) {
    return <div>Loading</div>
  }

  if (!posts) {
    return <div>No posts :(</div>
  }

  return (
    <List spacing={3}>
      {posts.map(({ id, name }) => (
        <ListItem key={id} onClick={() => push(`/posts/${id}`)}>
          <ListIcon as={MdBook} color="green.500" /> {name}
        </ListItem>
      ))}
    </List>
  )
}

export const PostsCountStat = () => {
  const {data: posts, status, error} = useGetPostsQuery();

  // const { data, status, error } = result

  console.log("data: ", posts);
  console.log("status: ", status);
  console.log("error: ", error);



  if (!posts) return null

  return (
    <Stat>
      <StatLabel>Active Posts</StatLabel>
      <StatNumber>{posts?.length}</StatNumber>
    </Stat>
  )
}


// NHS begins here...
export const PostsManager = () => {
  return (
    <Box>
      <Flex bg="#011627" p={4} color="white">
        <Box>
          <Heading size="xl">Manage Posts</Heading>
        </Box>
        <Spacer />
        <Box>
          <PostsCountStat />
        </Box>
      </Flex>
      <Divider />
      <AddPost />
      <Divider />
      <Flex wrap="wrap">
        <Box flex={1} borderRight="1px solid #eee">
          <Box p={4} borderBottom="1px solid #eee">
            <Heading size="sm">Posts</Heading>
          </Box>
          <Box p={4}>
            <PostList />
          </Box>
        </Box>
        <Box flex={2}>
          <Switch>
            <Route path="/posts/:id" component={PostDetail} />
            <Route>
              <Center h="200px">
                <Heading size="md">Select a post to edit!</Heading>
              </Center>
            </Route>
          </Switch>
        </Box>
      </Flex>
    </Box>
  )
}

// NHS ends here....

export default PostsManager
