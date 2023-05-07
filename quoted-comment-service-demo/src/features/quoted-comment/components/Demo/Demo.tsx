import { useMemo } from 'react'

import { arrange, desc, tidy } from '@tidyjs/tidy'

import { Loading } from '@/components/ui/Loading'
import { Separator } from '@/components/ui/Separator'
import { Spacer } from '@/components/ui/Spacer'
import { CommentCreateForm } from '@/features/quoted-comment/components/CommentCreateForm'
import { Comments } from '@/features/quoted-comment/components/Comments'
import useListUpComment from '@/features/quoted-comment/hooks/useListUpComment'

const Demo = () => {
  const { flatComments } = useListUpComment()

  const CommentContent = useMemo(() => {
    if (!flatComments) {
      return <Loading />
    }
    if (flatComments.length === 0) {
      return <p>Not comment yet.</p>
    }

    const sortedFlatComments = tidy(flatComments, arrange([desc('updatedAt')]))

    return <Comments comments={sortedFlatComments} />
  }, [flatComments])

  const SeparatorContent = useMemo(() => {
    if (!flatComments) {
      return null
    }
    if (flatComments.length === 0) {
      return null
    }

    return (
      <>
        <Spacer className={`h-14`} />
        <Separator className={`h-1 bg-slate-300`} />
        <Spacer className={`h-14`} />
      </>
    )
  }, [flatComments])

  return (
    <div className='min-h-screen w-full bg-slate-200 pt-2 xl:pt-24'>
      <main className='mx-2 rounded-xl pb-24 xl:mx-96'>
        <section className='min-h-[10rem] w-full'>
          <h2 className='font-merriweather text-2xl font-bold'>Dicussion</h2>
          <Spacer />
          {CommentContent}
        </section>

        {SeparatorContent}

        <section className='w-full'>
          <CommentCreateForm parentId={null} />
        </section>
      </main>
    </div>
  )
}

export default Demo
