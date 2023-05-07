import { QueryClientProvider } from '@tanstack/react-query'
import { enableMapSet } from 'immer'
import { NextPage } from 'next'
import { RecoilEnv, RecoilRoot } from 'recoil'

import { Demo } from '@/features/quoted-comment/components/Demo'
import { queryClient } from '@/libs/queryClient'

// https://immerjs.github.io/immer/installation/#pick-your-immer-version
enableMapSet()

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

const HomePage: NextPage = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Demo />
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default HomePage
