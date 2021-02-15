import { AlertLevel } from '..'

declare module '@/src/data/*.json' {
  interface JsonData {
    words: { [key: string]: number }
    category: { [key: number]: string }
    level: { [key: number]: AlertLevel }
  }

  const data: JsonData

  export default data
}
