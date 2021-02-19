/**
 * @description state在本地缓存中的操作
 */

import store from '@/store'

/**
 * @description 初始化sessionStorage
 */
function _initSessionFun (type) {
  let state = ''
  try {
    state = JSON.parse(sessionStorage.getItem(type))
  } catch (error) {
    state = sessionStorage.getItem(type)
  }

  state && store.commit(type, state)
}

/**
 * @description 初始化localStorage
 */
function _initLocalFun (type) {
  let state = ''
  try {
    state = JSON.parse(localStorage.getItem(type))
  } catch (error) {
    state = localStorage.getItem(type)
  }
  state && store.commit(type, state)
}

const sessionMutationTypes = [
  'SET_INFO',
  'SET_SSOTOKEN',
  'SET_STREAMID',
  'SET_LOGINAT',
  'SET_NOPAPERSTORELIST',
  'SET_ORDER_INFO',
  'SET_PRODUCT_INFO',
  'SET_PERMISSIONS',
  'SET_IS_SERVER_BUSY'
]
const localMutationTypes = ['SET_STOREINFO']

/**
 * @description 从缓存中初始化 state
 */
export function initStateFromStorage () {
  sessionMutationTypes.forEach(item => {
    _initSessionFun(item)
  })
  localMutationTypes.forEach(item => {
    _initLocalFun(item)
  })
}

/**
 * @description 清除session缓存
 */
export function removeSession () {
  sessionMutationTypes.forEach(item => {
    sessionStorage.removeItem(item)
  })
}

/**
 * @description 清除local缓存
 */
export function removeLocal () {
  localMutationTypes.forEach(item => {
    localStorage.removeItem(item)
  })
}

export function getSessionStorage (type) {
  const data = sessionStorage.getItem(type)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

export function getLocalStorage (type) {
  const data = localStorage.getItem(type)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

export function setSessionStorage (type, data) {
  if (typeof data === 'string') {
    sessionStorage.setItem(type, data)
    return
  }
  sessionStorage.setItem(type, JSON.stringify(data))
}

export function setLocalStorage (type, data) {
  if (typeof data === 'string') {
    sessionStorage.setItem(type, data)
    return
  }
  localStorage.setItem(type, JSON.stringify(data))
}
