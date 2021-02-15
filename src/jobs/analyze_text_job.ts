import alex from 'alex'
import insensitiveWordSet from '../data/insensitive_word_category.json'
import { Alert, AlertLevel } from '..'

const TinySegmenter = require('tiny-segmenter')
const segmenter = new TinySegmenter()

declare global {
  interface Window {
    kuromojin: any
  }
}

// window.kuromojin = {
//   dicPath: 'https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict',
// }
// const linter = new window.Textlint()
// linter.lintText('初期化用テキスト').then((res: any) => {
//   console.log('initialize load take time', end - start)
// })

const insensitiveWordMap: { [key: string]: number } = insensitiveWordSet.words
const insensitiveCategoryMap: { [key: number]: string } =
  insensitiveWordSet.category
const insensitiveLevelMap = insensitiveWordSet.level as {
  [key: number]: AlertLevel
}

export class AnalyzeTextJob {
  text: string
  alerts: Alert[] = []
  curPos: number = 0
  id: number = 0

  constructor(text: string) {
    this.text = text
  }

  perform = async (): Promise<Alert[]> => {
    try {
      await this.checkJapaneseKinshiWord()
      await this.checkEnglishInsensitiveWord()
      // @await this.checkTextlint()
    } catch (error) {
      console.error('failed to analyze sentence', error)
    }

    return this.alerts
  }

  checkJapaneseKinshiWord = async (): Promise<void> => {
    const tokens: string[] = segmenter.segment(this.text)

    tokens.forEach((token) => {
      const categoryIndex: number | undefined = insensitiveWordMap[token]
      if (categoryIndex) {
        const categoryLabel = insensitiveCategoryMap[categoryIndex]
        const level = insensitiveLevelMap[categoryIndex]
        const alertMessage = `「${token}」は${categoryLabel}に関するリスクのある単語です。`

        this.alerts.push({
          id: (this.id++).toString(),
          startOffset: this.curPos,
          endOffset: this.curPos + token.length,
          message: alertMessage,
          level: level,
        })
      }
      this.curPos += token.length
    })
  }

  checkEnglishInsensitiveWord = async (): Promise<void> => {
    const alexResultList = alex(this.text).messages

    alexResultList.forEach((alexResult) => {
      const token = alexResult.actual as string
      const actualCurPos = this.text.indexOf(token as string)
      let alertMessage = `『${token}』は不適切である可能性のある英単語です。`
      if ((alexResult.expected as string[]).length > 0) {
        alertMessage += `${(alexResult.expected as string[]).join(
          ' ,'
        )}などに置き換えてください。`
      }
      alertMessage += alexResult.message

      this.alerts.push({
        id: (this.id++).toString(),
        startOffset: actualCurPos,
        endOffset: actualCurPos + token.length,
        message: alertMessage,
        level: 'warn',
      })
    })
  }

  // checkTextlint = async (): Promise<void> => {
  //   const res = await linter.lintText(this.text)
  //   res.messages.forEach((message: any) => {
  //     this.alerts.push({
  //       id: (this.id++).toString(),
  //       startOffset: message.index as number,
  //       endOffset: message.column as number,
  //       message: message.message,
  //     })
  //   })
  // }
}
