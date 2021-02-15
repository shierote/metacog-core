import { Highlight, Alert, AlertLevel } from '..'

export class UpdateHighlightsJob {
  constructor(private _alerts: Alert[], private _node: Node) {}

  private _highlights: Highlight[] = []
  private _ranges: {
    [k: string]: { range: Range; message: string; level: AlertLevel }
  } = {}

  perform = async (): Promise<Highlight[]> => {
    Object.keys(this._ranges).forEach((k) => this._ranges[k].range.detach())

    this._alerts.forEach((alert) => {
      const r = document.createRange()
      r.setStart(this._node, alert.startOffset)
      r.setEnd(this._node, alert.endOffset)

      this._ranges[alert.id] = {
        range: r,
        message: alert.message,
        level: alert.level,
      }
    })

    const newHighlights: Highlight[] =
      process.env.NODE_ENV === 'test'
        ? Object.values(this._ranges).map((range) => {
            return {
              top: 0,
              left: 0,
              height: 100,
              width: 100,
              message: range.message,
              level: range.level,
            }
          })
        : Object.values(this._ranges)

            .filter((range) => {
              return range.range.getClientRects().item(0)
            })
            .map((range) => {
              const rect = range.range.getClientRects()[0]

              return {
                top: rect.top,
                left: rect.left,
                height: rect.height,
                width: rect.width,
                message: range.message,
                level: range.level,
              }
            })
    this._highlights = this._highlights.concat(newHighlights)

    return this._highlights
  }
}
