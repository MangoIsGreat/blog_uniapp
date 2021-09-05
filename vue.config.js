module.exports = {
  transpileDependencies: ["@dcloudio/uni-ui"],
  chainWebpack: (config) => {
    config.module
      .rule("")
      .test(/\.md$/)
      .use("html-loader")
      .loader("html-loader")
      .end()
      .use("markdown-loader")
      .loader("markdown-loader")
      .end();
  },
};
