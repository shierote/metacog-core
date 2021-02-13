import { AnalyzeTextJob } from "../jobs/analyze_text_job"
import { UpdateHighlightsJob } from "../jobs/update_highlight_job"
import { Highlight } from "../"

export const fetchHighlightListFrom = async (nodeList: Node[]): Promise<Highlight[][]> => {
  return await Promise.all(
    nodeList
      .filter((node) => {
        return node.textContent?.trim()
      })
      .map(async (node) => {
        const analyzeTextJob = new AnalyzeTextJob(node.textContent || '')
        const alertList = await analyzeTextJob.perform()

        const updateHighlightsJob = new UpdateHighlightsJob(alertList, node)
        const highlightList = await updateHighlightsJob.perform()
        return highlightList
      })
  )
}
