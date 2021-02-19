import appBaseData from './AppBaseData'
import checkUserAndLogin from './auth'

export default async function init ({ parentAppName }) {
  // await checkUserAndLogin({ parentAppName })
  return {
    userInfo: appBaseData.__USER_INFO,
    storeInfo: appBaseData.__STORE_INFO,
    permissions: appBaseData.__PERMISSIONS,
    storePermissios: appBaseData.__STORE_PERMISSIOS,
    streamId: appBaseData.__STREAM_ID,
    parentAppName: parentAppName
  }
}
