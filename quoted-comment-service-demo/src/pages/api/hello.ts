// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import queryString from 'query-string'
import { toVFile } from 'to-vfile'

import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const demoURL =
    'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg?20070224000419&hogehoge=huga&aaa=bbb'
  const { url, query } = queryString.parseUrl(demoURL)
  const vFile = toVFile(url)
  res.status(200).json({ extname: vFile.extname?.slice(1), query, url })
}
