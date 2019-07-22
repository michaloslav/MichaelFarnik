module.exports = api => {
  const env = api.cache(() => process.env.NODE_ENV)

  return {
    presets: [
      "@babel/preset-env"
    ]
  }
}