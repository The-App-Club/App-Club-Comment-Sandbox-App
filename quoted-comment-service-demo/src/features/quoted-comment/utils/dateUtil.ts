import { default as dayjs } from 'dayjs'
import ja from 'dayjs/locale/ja'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.locale(ja)
dayjs.tz.setDefault('Asia/Tokyo')

export { dayjs }
