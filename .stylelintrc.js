module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order' // 检查属性顺序
  ],
  rules: {
    // 禁止使用可以缩写却不缩写的属性
    'declaration-block-no-redundant-longhand-properties': true
  }
}
