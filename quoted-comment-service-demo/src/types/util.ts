type Builtin =
  | number
  | string
  | boolean
  | bigint
  | symbol
  | Function
  | Date
  | Error
  | RegExp
  | null
  | undefined

type BuiltinOmitNull = Exclude<Builtin, null>

type BuiltinOmitUndefined = Exclude<Builtin, undefined>

export type DeepNullish<T> = T extends Builtin
  ? T
  : { [key in keyof T]?: DeepNullish<T[key]> | null | undefined }

export type DeepNonUndefinable<T> = T extends BuiltinOmitNull
  ? NonNullable<T>
  : { [key in keyof T]-?: DeepNonUndefinable<T[key]> }

export type DeepNonNullable<T> = T extends BuiltinOmitUndefined
  ? NonNullable<T>
  : { [key in keyof T]: DeepNonNullable<T[key]> }
