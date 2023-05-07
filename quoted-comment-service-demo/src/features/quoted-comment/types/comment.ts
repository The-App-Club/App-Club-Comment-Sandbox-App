import { Simplify, SnakeCasedProperties } from 'type-fest'

// import { DeepNonNullable, DeepNullish } from '@/types/util'

export type Comment = {
  id: string
  type: 'root' | 'child'
  parentId: string | null
  author: string
  text: string
  isHidden: boolean
  isDeleted: boolean
  children: Comment[]
  createdAt: string // 2023/5/7 12:42:36
  updatedAt: string // 2023/5/7 12:42:36
}

export type CommentWithSibling = Simplify<
  Comment & {
    depth: number
    siblingIndex: number | null
  }
>

export type CommentForDB = SnakeCasedProperties<Comment>

// export type UpdateCommentForWEB = Simplify<
//   Pick<Comment, 'id'> &
//     DeepNonNullable<
//       DeepNullish<Pick<Comment, 'isHidden' | 'text' | 'updatedAt'>>
//     >
// >
// export type UpdateCommentForDB = Simplify<
//   Pick<Comment, 'id'> &
//     DeepNonNullable<
//       DeepNullish<
//         Simplify<
//           Pick<
//             SnakeCasedProperties<Comment>,
//             'is_hidden' | 'text' | 'updated_at'
//           >
//         >
//       >
//     >
// >

export type MappedComment = Map<string, Comment>
