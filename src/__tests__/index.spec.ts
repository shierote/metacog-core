/**
 * @jest-environment jsdom
 */

import metacog from '..'

test('Detect insensitive words as highlight list', async () => {
  const element = document.createElement('div')
  const textContent = document.createTextNode(
    `まーたネトウヨさんが世界に恥さらしてんの？
    反日野郎が
    チョンと一緒に死ねば良いのに`
  )
  element.appendChild(textContent)
  const highlightList = await metacog(element)
  console.info(highlightList)

  expect(highlightList.length).toBe(6)
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
