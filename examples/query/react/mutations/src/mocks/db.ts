import { factory, primaryKey } from '@mswjs/data'
// https://github.com/mswjs/data

import { nanoid } from '@reduxjs/toolkit'

import { rest } from 'msw';

// https://github.com/mswjs/msw

import { Post } from '../app/services/posts'

/*

tsx extension is used when we want to embed JSX elements inside the files while .

 ts is used for plain Typescript files and do not support adding JSX Elements.


 when you use .tsx you can use JSX in that particular file while
 */

const db = factory({
  post: {
    id: primaryKey(String),
    name: String,
  },
})

;[
  'A sample post',
  'A post about RTK Query',
  'How to randomly throw errors, a novella',
].forEach((name) => {
  db.post.create({ id: nanoid(), name })
})

export const handlers = [
  rest.post('/posts', async (req, res, ctx) => {

    console.log("req: (/posts) ---------------------------------- ", req);



    const { name } = req.body as Partial<Post>

    if (Math.random() < 0.3) {
      console.log("user generated 500 error");
      return res(
        ctx.json({ error: 'Oh no, there was an error, try again.' }),
        ctx.status(500),
        ctx.delay(300)
      )
    }

    const post = db.post.create({
      id: nanoid(),
      name,
    })

    return res(ctx.json(post), ctx.delay(300))
  }),
  rest.put('/posts/:id', (req, res, ctx) => {

    console.log("req: (/posts/:id) ---------------------------------- ", req);
    const { name } = req.body as Partial<Post>

    if (Math.random() < 0.3) {
      return res(
        ctx.json({ error: 'Oh no, there was an error, try again.' }),
        ctx.status(500),
        ctx.delay(300)
      )
    }

    const post = db.post.update({
      where: { id: { equals: req.params.id } },
      data: { name },
    })

    return res(ctx.json(post), ctx.delay(300))
  }),

    /*
  rest.delete('/posts/:id', (req, res, ctx) => {
    console.log("xyz");

    console.log("req: (/posts/:id) ---------------------------------- ", req);
    const { name } = req.body as Partial<Post>

    if (Math.random() < 0.3) {
      return res(
          ctx.json({ error: 'Oh no, there was an error, try again.' }),
          ctx.status(500),
          ctx.delay(300)
      )
    }

    const post = db.post.update({
      where: { id: { equals: req.params.id } },
      data: { name },
    })

    return res(ctx.json(post), ctx.delay(300))
  }),
    */

    //

    /*

    /**
     Generate request handlers of the given type based on the model.

     toHandlers<HandlerType extends 'rest' | 'graphql'>(type: HandlerType, baseUrl?: string):
     HandlerType extends 'rest' ? RestHandler[] : GraphQLHandler[];

     // /home/taxi/Programs/byvl/RTkForkedJuly252021/node_modules/@mswjs/data/lib/glossary.d.ts
     */



  ...db.post.toHandlers('rest'),
] as const
