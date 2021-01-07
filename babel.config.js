const plugins = []

// 按需引入ant-design-vue组件，会自动引入组件对应的css文件
plugins.push(['import', {
  'libraryName': 'ant-design-vue',
  'libraryDirectory': 'es',
  'style': true // `style: true` 会加载 less 文件
}])

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ]
  // plugins
}
