import { saveAsZip } from './jszip'

let disabledDownload = false // 限制点击频率，下载开始之后禁止

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body
  const div = document.createElement('div')
  const button = document.createElement('button')

  button.innerText = '点击下载远程图片压缩包'

  button.addEventListener('click', handleClick)

  div.appendChild(button)

  body.appendChild(div)
})

const handleClick = () => {
  if (disabledDownload) {
    return false
  }

  disabledDownload = true

  const urls = [
    'http://pic.kabuda.vip/4a460c82-9d8e-11e5-8ce1-f6219b685d74.jpg?attname=',
    'http://pic.kabuda.vip/5ea18f5e20aa460e86a2748cc297b0ca.jpeg?attname=',
    'http://pic.kabuda.vip/HOW%20TO%20LAUNCH%20COCA-COLA%20ROCKET%20IN%20THE%20SKY%20-%20YouTube_20180607231447.JPG?attname='
  ]

  console.log('下载开始')

  saveAsZip(urls)
    .then(() => {
      disabledDownload = false
      console.log('下载成功')
    })
    .catch(() => {
      console.log('打包失败')
    })
}
