// import * as UserAction from 'api/manage_auth/user'
// import * as StoreAccountAction from 'api/himo_product_store/account'
// import * as BmsAccountAction from 'api/himo_product/account'
// import appBaseData from '@/qiankun/AppBaseData'
// import { Base64 } from 'js-base64'

// const ssoToken = appBaseData.__SSO_TOKEN
// const storeInfo = appBaseData.__STORE_INFO
// const corpid = process.env.VUE_APP_DD_CORP_ID
// // 区分使用bms登陆还是门店的登陆， 区别在于权限点不同
// let AccountAction = StoreAccountAction

// // 登陆
// export async function login () {
//   const data = await UserAction.login({ token: ssoToken })
//   appBaseData.setData({
//     __STREAM_ID: data.token,
//     __LOGIN_AT: Date.now()
//   })
// }

// // 获取用户信息
// async function FetchUserInfo () {
//   const data = await AccountAction.info()
//   const storePermissios = data.store_permissions

//   appBaseData.setData({
//     __USER_INFO: data.staff_info,
//     __PERMISSIONS: data.permission_list,
//     __STORE_PERMISSIOS: storePermissios
//   })

//   if (!storePermissios.length) {
//     throw new Error('没有可用门店')
//   }
//   if (storePermissios?.length && storeInfo) {
//     const selectedStore = storePermissios.find(store => store.id === storeInfo.id)
//     return selectedStore
//   }

//   return storePermissios[0]
// }

// // 更新Session
// export async function UpdateStoreSession (storeInfo) {
//   await AccountAction.selectStore({ store_id: storeInfo.id })
//   // kidsAuth.length有就是kids，没有就是海马体
//   const kidsAuth = await AccountAction.getKidsAuthList()
//   if (kidsAuth.length) {
//     storeInfo.storeType = 'kids'
//     const permissions = appBaseData.permissions
//     permissions.base_auth = permissions.base_auth.filter(auth => kidsAuth.includes(auth.name))
//     appBaseData.permissions = permissions
//   }
//   appBaseData.setData({ __STORE_INFO: storeInfo })
//   localStorage.setItem('SET_STOREINFO', storeInfo)
// }

// // 获取登陆数据
// export async function LoginAndGetRoutes () {
//   const baseStore = await FetchUserInfo()
//   await UpdateStoreSession(baseStore)
// }

// // 跳转到登陆页面
// export function toLoginPage () {
//   const query = JSON.stringify({
//     title: 'HIMO-STORE门店系统',
//     redirect: `${window.location.origin}${window.location.pathname}#/?token=`
//   })
//   window.location.replace(process.env.VUE_APP_LOGIN_URL + Base64.encode(query))
// }

// // 检查用户是否登陆
// export default async function checkUserAndLogin ({ parentAppName }) {
//   AccountAction = parentAppName === 'himo-management-center'
//     ? BmsAccountAction
//     : StoreAccountAction
//   const userid = appBaseData.__USER_INFO.id
//   const ssoToken = appBaseData.__SSO_TOKEN
//   try {
//     if (!userid) {
//       if (!ssoToken) {
//         toLoginPage()
//         return
//       }
//       await login()
//       await LoginAndGetRoutes()
//     }
//   } catch (e) {
//     console.error(e)
//     toLoginPage()
//   }
// }

// export function removeSession () {
//   appBaseData.removeSession()
// }
