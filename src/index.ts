import { fetchHighlightListFrom } from './lib/highlight'
import { extractNodeList } from './lib/node'

const metacog: (element: HTMLElement) => Promise<Highlight[]> = async (
  element
) => {
  const nodeList = extractNodeList(element)
  const allHighlightList = await fetchHighlightListFrom(nodeList)
  return allHighlightList.flat()
}

export default metacog

export type Highlight = {
  readonly top: number
  readonly left: number
  readonly width: number
  readonly height: number
  readonly message: string
  readonly level: 'info' | 'warn' | 'critical'
}

export type Alert = {
  readonly startOffset: number
  readonly endOffset: number
  readonly id: string
  readonly message: string
}
