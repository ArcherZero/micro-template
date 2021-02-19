/**
 * @description 处理接口返回 error 类
 */
// import { errorMessage } from 'config/enum/error/errorMessage'
import { errorTipHandler } from 'mainto-fed-utils'

class ApiError extends Error {
  constructor () {
    super()
    this.name = 'ApiError'
    this.message = '网络繁忙，请稍后再试'
    this.code = 0
  }

  async init (message, code) {
    // 只传一个 code 的情况
    if (code === undefined && typeof message === 'number') {
      code = message
      message = 'api请求错误'
    }
    this.code = code || 0
    this.message = message || 'api请求错误'

    // 特殊错误码处理
    switch (parseInt(code)) {
      case parseInt(0xE03001001):
        this.message = `创建订单失败，可预约时间点不足，请开放排单表中 ${this.message} 时间点`
        return this
      case parseInt(0xA01306001):
        const staffId = this.message.match('[0-9]+')[0]
        this.message = `该订单已被 ${staffId} 绑定`
        return this
      default:
        // 错误码转中文处理
        // const error = errorMessage.find(v => {
        //   return v.keyWords.every(word => this.message.includes(word))
        // })
        // if (error) {
        //   this.message = error.message
        //   this.code = error.code
        //   return this
        // }
        break
    }
    // 从已记录的错误信息中提取 message
    // 后端返回信息不为字符串时

    if (typeof this.message === 'object') {
      this.message = JSON.stringify(this.message)
    } else if (this.code) {
      const message = await errorTipHandler.tip(code, { exclude: [], retry: 2 })
      this.message = message || this.message
      if (!message) {
        this.code = 500
      }
    }

    return this
  }
}

export default ApiError
