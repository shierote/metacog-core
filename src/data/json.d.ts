declare module '@/src/data/*.json' {
  interface JsonData {
    words: { [key: string]: number }
    category: { [key: number]: string }
  }

  const data: JsonData

  export default data
}
