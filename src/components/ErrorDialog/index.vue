<template>
  <!-- 灰 -->
  <el-dialog
    title="请求失败"
    :visible.sync="dialogVisible"
    width="30%"
  >
    <div class="error-dialog__body">
      <i class="error-dialog__status el-icon-warning"></i>
      <div>
        <p style="margin-top: 5px; font-weight: bold;">TraceId: {{ errorDialog.traceId }}</p>
        <p style="line-height: 1.5;">错误内容：{{ errorDialog.errorMessage }}</p>
        <p style="max-height: 95px; overflow-y: auto; line-height: 1.5;" >错误信息：{{ errorDialog.errorContent }}</p>
        <p style="color: #999;">（截图并复制TraceId后反馈至互联网中心）</p>
      </div>
      <div class="error-dialog__qrcode">
        <canvas
          ref="canvas"
          width="80px"
          height="80px"
        />
      </div>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">关闭</el-button>
      <el-button type="primary" @click="copyTraceId">复制TraceId</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
import QRCode from 'qrcode'

export default {
  name: 'ErrorDialog',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['errorDialog']),
    dialogVisible: {
      get () {
        return this.errorDialog.visible
      },
      set () {
        this.$store.commit('TOGGLE_ERROR_DIALOG', false)
      }
    }
  },
  watch: {
    errorDialog: {
      handler () {
        this.$nextTick(() => {
          const opt = {
            width: 80,
            height: 80,
            errorCorrectionLevel: 'L'
          }
          QRCode.toCanvas(this.$refs.canvas, this.errorDialog.traceId || this.errorDialog.url || 'No TraceId', opt)
        })
      },
      deep: true
    }
  },
  methods: {
    copyTraceId () {
      this.$copyText(`TraceId：${this.errorDialog.traceId}`).then(function (e) {
        Message.success('复制TraceId成功')
      }, function (e) {
        Message.error('复制TraceId失败')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.error-dialog {
  &__body {
    display: flex;
    align-items: center;
    padding: 0;
  }

  &__status {
    margin-right: 20px;
    font-size: 28px;
    color: #e6a23c;
  }

  &__qrcode {
    margin-left: 5px;
  }
}
</style>
