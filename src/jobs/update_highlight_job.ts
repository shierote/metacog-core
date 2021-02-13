import { Highlight, Alert } from '..'

export class UpdateHighlightsJob {
  constructor(private _alerts: Alert[], private _node: Node) {}

  private _highlights: Highlight[] = []
  private _ranges: { [k: string]: { range: Range; message: string } } = {}

  perform = async (): Promise<Highlight[]> => {
    Object.keys(this._ranges).forEach((k) => this._ranges[k].range.detach())

    this._alerts.forEach((a) => {
      const r = document.createRange()
      r.setStart(this._node, a.startOffset)
      r.setEnd(this._node, a.endOffset)

      this._ranges[a.id] = {
        range: r,
        message: a.message,
      }
    })

    const newHighlights: Highlight[] = Object.values(this._ranges)
      .filter((range) => {
        return range.range.getClientRects()[0]
      })
      .map((range) => {
        const rect = range.range.getClientRects()[0]

        return {
          top: rect.top,
          left: rect.left,
          height: rect.height,
          width: rect.width,
          message: range.message,
        }
      })
    this._highlights = this._highlights.concat(newHighlights)

    return this._highlights
  }
}
