declare module '@/src/data/*.json' {
  interface JsonData {
    wordList: string[]
  }

  const data: JsonData

  export default data
}
