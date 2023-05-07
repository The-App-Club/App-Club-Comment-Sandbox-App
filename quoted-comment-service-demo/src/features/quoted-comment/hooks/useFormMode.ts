import { useMemo } from 'react'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import formModeState from '@/features/quoted-comment/stores/formMode'

const useFormMode = () => {
  const activeFormMode = useRecoilValue(formModeState)
  const setActiveFormMode = useSetRecoilState(formModeState)

  return useMemo(() => {
    return {
      activeFormMode,
      setActiveFormMode,
    }
  }, [activeFormMode, setActiveFormMode])
}

export default useFormMode
