// module.exports = {
//   // publicPath: "/2103shareblog",
// };

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  runtimeCompiler: true,
  publicPath: isProd ? "http://static.linzhihui.online/2103shareblog" : "/",
  assetsDir: "yxy",
};
