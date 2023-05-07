import React, { FC, useMemo } from 'react'

import _TimeAgo from 'javascript-time-ago'
// @ts-ignore
import ja from 'javascript-time-ago/locale/ja.json'
import ReactTimeAgo from 'react-time-ago'

// https://github.com/malerba118/supabase-comments-extension/blob/main/src/components/TimeAgo.tsx
_TimeAgo.addDefaultLocale(ja)

interface TimeAgoProps {
  date: string | Date
  locale: string
}

const TimeAgo: FC<TimeAgoProps> = ({ date, locale = 'ja-JP' }) => {
  const _date = useMemo(() => new Date(date), [date])

  return <ReactTimeAgo date={_date} locale={locale} timeStyle='mini-now' />
}

export default TimeAgo
