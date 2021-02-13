export const extractNodeList = (element: HTMLElement): Node[] => {
  return [getAllDescendantNodeOf(element)].flat(Infinity)
}

type NodeFractal = Node | NodeFractal[]

const getAllDescendantNodeOf = (node: Node): NodeFractal => {
  if (node.childNodes.length == 0) {
    return node
  } else {
    return Array.from(node.childNodes).map((node) => {
      return getAllDescendantNodeOf(node)
    })
  }
}
