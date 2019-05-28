import jszip from 'jszip'
import jszipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'

const zip = new jszip()

const urlToPromise = url => {
  return new Promise((resolve, reject) => {
    jszipUtils.getBinaryContent(url, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const saveAsZip = urls => {
  /**
   * @param {Array} urls 远程地址的数组
   */
  return new Promise((resolve, reject) => {
    let index = 1
    if (urls && urls.length) {
      urls.forEach(v => {
        let filename = 'images/img_' + index + '.jpg'

        zip.file(filename, urlToPromise(v), { binary: true })

        index++
      })

      zip
        .generateAsync({ type: 'blob' }, res => {
          console.log('processing：', res)
        })
        .then(blob => {
          saveAs(blob, 'files.zip')
          alert('文件打包下载完成')
          resolve()
        })
        .catch(err => {
          console.log(err)
          reject()
        })
    } else {
      window.alert('文件不存在')
      reject()
    }
  })
}

export { saveAsZip }
