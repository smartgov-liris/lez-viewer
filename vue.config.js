module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/lez-viewer/'
    : '/'
  ,
  outputDir: "docs"
}
