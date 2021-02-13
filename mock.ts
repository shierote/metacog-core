const iterable1 = {
  [Symbol.iterator]: function*() {
    yield 1
    yield 2
    yield 3
  },
}

console.log([...iterable1])
// expected output: Array [1, 2, 3]
console.log([...iterable1][0])

type Rect = {
  x: number
  y: number
  width: number
  height: number
  top: number
  right: number
  bottom: number
  left: number
  toJSON: () => void
}

const rectListMock: {
  [Symbol.iterator]: Generator<Rect, Rect, Rect>
} = {
  [Symbol.iterator]: function*() {
    yield {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      top: 0,
      right: 100,
      bottom: 100,
      left: 100,
      toJSON: () => {},
    }
  },
}

const iterable2 = () => rectListMock
console.log(iterable2())
console.log(iterable2()[0])
