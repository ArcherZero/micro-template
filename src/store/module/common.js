
const common = {
  state: {
    errorDialog: {
      visible: false,
      traceId: '',
      url: '',
      errorMessage: '',
      errorContent: ''
    }
  },
  getters: {
    errorDialog: state => state.errorDialog
  },
  mutations: {
    SET_ERROR_DIALOG (state, data) {
      state.errorDialog.traceId = data.traceId
      state.errorDialog.errorMessage = data.errorMessage
      state.errorDialog.errorContent = data.errorContent
      state.errorDialog.url = data.url
    },
    TOGGLE_ERROR_DIALOG (state, data) {
      state.errorDialog.visible = data
    }
  }
}

export default common
