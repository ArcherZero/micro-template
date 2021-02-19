import axios from 'axios'
import store from '../store'
import ApiResponse from 'model/ApiResponse.class'
import ApiError from 'model/ApiError.class'
import { Message } from 'element-ui'
import { removeSession } from '@/utils/storage'
// import { toLoginPage } from '../permission'

// 实例配置
const instance = axios.create({
  timeout: 100000,
  baseURL: process.env.VUE_APP_API_HOST,
  withCredentials: false
})
instance.defaults.headers.post['Content-Type'] = 'application/json'

// 对响应数据进行处理
instance.interceptors.response.use(function (response) {
  const res = new ApiResponse(response)
  if (res.success) {
    // 目前接口返回200，则必定有 msg，所以暂不考虑返回200，success=false 情况
    return res.msg
  } else {
    // 因又拍云图片上传需要，不包含msg字段，故全部返回
    return res
  }
}, async function (error) {
  setTimeout(() => store.dispatch('setLoadingStatus', false), 300)
  let message = error.message
  let code = 0
  // 接口 TraceId 追踪
  const traceId = error.response?.data?.trace_id || '未获取到TranceId'
  if (error.response && error.response.data) {
    const resError = error.response.data
    message = resError.error_msg
    code = resError.error_code
  }
  const err = await new ApiError().init(message, code)
  const COMMON_ERROR_CODE = [404, 422, 500]
  if (!COMMON_ERROR_CODE.includes(err.code)) {
    Message.warning(err.message)
  } else {
    store.commit('TOGGLE_ERROR_DIALOG', true)
    store.commit('SET_ERROR_DIALOG', {
      traceId,
      errorMessage: err.message,
      errorContent: message
    })
  }
  // 4011 未登录或登录状态失效
  switch (err.code) {
    case 4011:
      removeSession()
      // zes::todo 父容器跳转
      // toLoginPage()
      return false
    default:
  }
  return Promise.reject(err)
})

// 设置请求头信息
instance.interceptors.request.use(
  config => {
    // 如果请求头里面带有 no-x-stream-id 则不传 x-stream-id
    const noXStreamId = config.headers.noXStreamId || false
    const newConfig = { ...config }
    noXStreamId && delete newConfig.headers.noXStreamId

    const streamId = store.getters.streamId
    if (streamId && streamId !== 'undefined' && !noXStreamId) {
      newConfig.headers['x-stream-id'] = streamId
    }
    return newConfig
  },
  error => {
    return Promise.reject(error)
  }
)

export function setAxiosBaseURL (baseURL) {
  instance.defaults.baseURL = baseURL
}

export default instance

