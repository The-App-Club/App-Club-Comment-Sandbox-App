/** @jsxImportSource @emotion/react */

import { groupBy, tidy } from '@tidyjs/tidy'
import { default as dayjs } from 'dayjs'
import { Err, Ok, Result } from 'neverthrow'
import { NextPage } from 'next'
import { RecoilEnv } from 'recoil'
import { Simplify } from 'type-fest'
import { u } from 'unist-builder'
import { z } from 'zod'

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

// https://github.com/colinhacks/zod#recursive-types
const CommentCoreSchema = z.object({
  id: z.number(),
  text: z.string(),
  author: z.string(),
  parentId: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

type Parent = z.infer<typeof CommentCoreSchema> & {
  children: Parent[]
}

const CommentSchema: z.ZodType<Parent> = CommentCoreSchema.extend({
  children: z.lazy(() => CommentSchema.array()),
})

type Comment = z.infer<typeof CommentSchema>

const safeParseCommentData = (data: unknown): Result<Parent, Error> => {
  const result = CommentSchema.safeParse(data)
  if (!result.success) {
    return new Err(
      new Error('Invalid input data.', {
        cause: result.error,
      })
    )
  }
  return new Ok(result.data)
}

const data: Comment[] = [
  {
    id: 1,
    author: 'a',
    text: 'First message.',
    parentId: null,
    createdAt: dayjs().toDate(),
    updatedAt: dayjs().add(4, 'days').toDate(),
    children: [
      {
        id: 2,
        author: 'b',
        text: 'Reply to author b message.',
        parentId: 1,
        createdAt: dayjs().subtract(7, 'days').toDate(),
        updatedAt: dayjs().add(1, 'days').toDate(),
        children: [
          {
            id: 3,
            author: 'c',
            text: 'Reply to author c message.',
            parentId: 2,
            createdAt: dayjs().subtract(6, 'days').toDate(),
            updatedAt: dayjs().add(2, 'days').toDate(),
            children: [],
          },
          {
            id: 4,
            author: 'd',
            text: 'Reply to author d message.',
            parentId: 2,
            createdAt: dayjs().subtract(5, 'days').toDate(),
            updatedAt: dayjs().add(3, 'days').toDate(),
            children: [],
          },
          {
            id: 5,
            author: 'e',
            text: 'Reply to author e message.',
            parentId: 2,
            createdAt: dayjs().subtract(4, 'days').toDate(),
            updatedAt: dayjs().add(4, 'days').toDate(),
            children: [],
          },
        ],
      },
      {
        id: 6,
        author: 'f',
        text: 'Reply to author f message.',
        parentId: 1,
        createdAt: dayjs().subtract(3, 'days').toDate(),
        updatedAt: dayjs().add(5, 'days').toDate(),
        children: [],
      },
    ],
  },
  // {
  //   id: 11,
  //   author: 'a',
  //   text: 'Second message.',
  //   parentId: null,
  //   createdAt: dayjs().toDate(),
  //   updatedAt: dayjs().add(4, 'days').toDate(),
  //   children: [
  //     {
  //       id: 12,
  //       author: 'b',
  //       text: 'Reply to author b message.',
  //       parentId: 11,
  //       createdAt: dayjs().subtract(7, 'days').toDate(),
  //       updatedAt: dayjs().add(1, 'days').toDate(),
  //       children: [
  //         {
  //           id: 13,
  //           author: 'c',
  //           text: 'Reply to author c message.',
  //           parentId: 12,
  //           createdAt: dayjs().subtract(6, 'days').toDate(),
  //           updatedAt: dayjs().add(2, 'days').toDate(),
  //           children: [],
  //         },
  //         {
  //           id: 14,
  //           author: 'd',
  //           text: 'Reply to author d message.',
  //           parentId: 12,
  //           createdAt: dayjs().subtract(5, 'days').toDate(),
  //           updatedAt: dayjs().add(3, 'days').toDate(),
  //           children: [],
  //         },
  //         {
  //           id: 15,
  //           author: 'e',
  //           text: 'Reply to author e message.',
  //           parentId: 12,
  //           createdAt: dayjs().subtract(4, 'days').toDate(),
  //           updatedAt: dayjs().add(4, 'days').toDate(),
  //           children: [],
  //         },
  //       ],
  //     },
  //     {
  //       id: 16,
  //       author: 'f',
  //       text: 'Reply to author f message.',
  //       parentId: 11,
  //       createdAt: dayjs().subtract(3, 'days').toDate(),
  //       updatedAt: dayjs().add(5, 'days').toDate(),
  //       children: [],
  //     },
  //   ],
  // },
]

const traverseCommentTree = (
  comment: Comment,
  depth: number,
  siblingIndex: number,
  tree: unknown[]
) => {
  const unisted = u('COMMENT', {
    id: comment.id,
    author: comment.author,
    text: comment.text,
    parentId: comment.parentId,
    children: comment.children,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    depth,
    siblingIndex: siblingIndex !== 0 ? siblingIndex : null,
  })

  tree.push(unisted)

  if (comment.children.length !== 0) {
    siblingIndex = 0
    comment.children.forEach((child, index) => {
      siblingIndex = siblingIndex + 1
      traverseCommentTree(child, depth + 1, siblingIndex, tree)
    })
  }

  return tree as unknown as Simplify<typeof unisted>[]
}

const doTrees = () => {
  const first = data[0]
  const rest = data.slice(1)
  const tree = traverseCommentTree(first, 0, 0, [])
  type Tree = (typeof tree)[number]
  const trees: Tree[][] = []
  trees.push(tree)

  rest.forEach((data) => {
    const tree = traverseCommentTree(data, 0, 0, [])
    trees.push(tree)
  })

  return trees
}

const doNeatTrees = () => {
  const trees = doTrees()
  const first = trees[0]
  const rest = trees.slice(1)
  const neatTree = tidy(first, groupBy(['parentId'], groupBy.entriesObject()))
  type Tree = (typeof trees)[number][number]
  type NeatTree = Simplify<
    Omit<(typeof neatTree)[number], 'values'> & {
      values: Tree[]
    }
  >
  const neatTrees: NeatTree[][] = []
  neatTrees.push(neatTree)

  rest.forEach((data) => {
    const neatTree = tidy(data, groupBy(['parentId'], groupBy.entriesObject()))
    neatTrees.push(neatTree)
  })

  return neatTrees
}

const HomePage: NextPage = () => {
  console.log(doNeatTrees())

  return null
  // const neatTrees = doNeatTrees()
  // return (
  //   <main className='p-24'>
  //     {neatTrees.map((trees) => {
  //       return (
  //         <>
  //           {trees.map((tree) => {
  //             return (
  //               <section key={tree.key}>
  //                 {tree.values.map((d) => {
  //                   return (
  //                     <div
  //                       key={d.id}
  //                       css={css`
  //                         padding: 1rem;
  //                         box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  //                         padding-left: ${d.parentId !== null
  //                           ? '2rem'
  //                           : '1rem'};
  //                       `}
  //                     >
  //                       <h2>{`#${d.id}`}</h2>
  //                       <p>{d.text}</p>
  //                       {d.parentId !== null && (
  //                         <span>{`Reply to #${d.parentId}`}</span>
  //                       )}
  //                       {d.parentId === null && (
  //                         <span>{`Have ${d.children.length} comments`}</span>
  //                       )}
  //                     </div>
  //                   )
  //                 })}
  //               </section>
  //             )
  //           })}
  //         </>
  //       )
  //     })}
  //   </main>
  // )
}

export default HomePage
