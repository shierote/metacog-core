/**
 * @jest-environment jsdom
 */

import metacog from '..'

test('Detect insensitive words as highlight list', async () => {
  const element = document.createElement('div')
  const textContent = document.createTextNode(
    'アメリカ人は日本人を支配している。'
  )
  element.appendChild(textContent)
  const highlightList = await metacog(element)
  console.info(highlightList)

  expect(highlightList.length).toBe(3)
})

test('Detect non insensitive words', async () => {
  const element = document.createElement('div')
  const textContent = document.createTextNode(
    'こんにちは、僕の名前は江口大志です。'
  )
  element.appendChild(textContent)
  const highlightList = await metacog(element)
  console.info(highlightList)

  expect(highlightList.length).toBe(0)
})
