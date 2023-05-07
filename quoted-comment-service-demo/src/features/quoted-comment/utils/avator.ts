import { Chance } from 'chance'

const neat = (original: string): (({ size }: { size: number }) => string) => {
  original = original.replace(
    'https://www.gravatar.com/avatar',
    'https://robohash.org'
  )
  return ({ size }: { size: number }): string => {
    return original + `?set=set4&bgset=&size=${size}x${size}`
  }
}

const createAuthor = (seed: string) => {
  return Chance(seed).name()
}

const createAvator = (seed: string) => {
  return neat(
    Chance(seed).avatar({
      protocol: 'https',
    }) as string
  )({ size: 200 })
}

export { createAvator, createAuthor }
