
const ENV = process.env.VUE_APP_SERVER_MODE
const permitParentHost = [
  'https://cp.hzmantu.com',
  'https://bms.hzmantu.com'
]

export function checkIsInIframe () {
  return self !== top
}

// postmessage 安全性
export function checkIsSafetyOrigin (parentOrigin) {
  if (ENV !== 'production') return true
  return permitParentHost.some(host => host === parentOrigin)
}
