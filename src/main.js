import './public-path'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './store'
import init from './qiankun/alone'
import { setAxiosBaseURL } from 'api/axios'
import { checkIsInIframe, checkIsSafetyOrigin } from './qiankun/iframe'

Vue.config.productionTip = false
const isInIframe = checkIsInIframe()
const isDev = process.env.VUE_APP_SERVER_MODE !== 'production'

// 'himo-management-center' bms
// 'mainto-admin' 新门店
// 区分使用bms登陆还是门店的登陆， 区别在于权限点不同
const defaultParentApp = 'mainto-admin'

if (isInIframe) {
  parent.postMessage({ type: 'before-micro-init', message: '子用用启动成功' }, '*')
  window.addEventListener('message', function (event) {
    if (!checkIsSafetyOrigin(event.origin)) return
    // eslint-disable-next-line
    if(event.data && event.data.type === 'set-micro-props') {
      render(event.data.message, true)
    }
  }, false)
} else if (isDev) {
  init({ parentAppName: defaultParentApp })
    .then((props) => {
      render(props)
    })
} else {
  location.href = 'https://cp.hzmantu.com'
}


let router = null
let instance = null
function render (props = {}) {
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/#/order/unit' : '/',
    mode: 'history',
    routes
  })

  router.afterEach((to) => {
    to.meta && to.meta.title && (document.title = to.meta.title)
    if (checkIsInIframe()) {
      // 子应用如果自己切换了路由， 同步到基座
      parent.postMessage({ type: 'before-micro-router-change', message: to.fullPath }, '*')
    }
  })

  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#order-container')
}
// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}
export async function mount (props) {
  console.log('[vue] props from main framework', props)
  render(props)
  setAxiosBaseURL(props.baseUrl)
}
export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}
