const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')

const config = getDefaultConfig(__dirname)

module.exports = withNativeWind(config, {
  input: './global.css',
  forceWriteFileSystem: true // 强制写入文件系统，解决热重载问题
})
