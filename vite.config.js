const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/main.js'),
      name: 'mind-ar',
      fileName: (format) => `mind-ar.${format}.js`
    }
  }
});