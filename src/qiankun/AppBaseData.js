import {
  getSessionStorage,
  getLocalStorage,
  setSessionStorage,
  setLocalStorage
} from '@/utils/storage'

class AppBaseData {
  __SSO_TOKEN = ''
  __USER_INFO = {}
  __PERMISSIONS = {}
  __STORE_PERMISSIOS = {}
  __STREAM_ID = ''
  // 登陆时间
  __LOGIN_AT = ''
  __STORE_LIMIT_CONFIG = {}
  __STORE_INFO = {}
  // 门店限流
  __IS_SERVER_BUSY = false
  // 事件
  eventListener = new Map()

  constructor () {
    this.__SSO_TOKEN = getSessionStorage('__SSO_TOKEN') || {}
    this.__USER_INFO = getSessionStorage('__USER_INFO') || {}
    this.__PERMISSIONS = getSessionStorage('__PERMISSIONS') || {}
    this.__STORE_PERMISSIOS = getSessionStorage('__STORE_PERMISSIOS') || {}
    this.__STREAM_ID = getSessionStorage('__STREAM_ID')
    this.__LOGIN_AT = getSessionStorage('__LOGIN_AT')
    this.__STORE_LIMIT_CONFIG = getSessionStorage('__STORE_LIMIT_CONFIG')
    this.__STORE_INFO = getLocalStorage('__STORE_INFO')
    this.__IS_SERVER_BUSY = getSessionStorage('__IS_SERVER_BUSY')
  }

  setData (object) {
    Object.entries(object).forEach(([key, value]) => {
      if (!this.hasOwnProperty(key)) {
        throw new Error('存储了错误的数据')
      }
      if (this.eventListener.get(key)) {
        this.eventListener.get(key)(value)
      }
      this[key] = value
      if (key !== '__STORE_INFO') {
        setSessionStorage(key, value)
      } else {
        setLocalStorage(key, value)
      }
    })
  }

  removeSession () {
    [
      '__SSO_TOKEN',
      '__USER_INFO',
      '__PERMISSIONS',
      '__STORE_PERMISSIOS',
      '__STREAM_ID',
      '__LOGIN_AT',
      '__STORE_LIMIT_CONFIG',
      '__STORE_INFO',
      '__IS_SERVER_BUSY'
    ].forEach(key => {
      sessionStorage.removeItem(key)
    })
    localStorage.removeItem('__STORE_INFO')
  }
}


export default new AppBaseData()
