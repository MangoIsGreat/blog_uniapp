let baseUrl = "";

if (process.env.NODE_ENV === "production") {
  // 生产环境
  baseUrl = "http://192.168.0.104:3001/v1";
} else {
  // 开发环境
  baseUrl = "http://192.168.0.104:3001/v1";
}

export default baseUrl;

// module.exports = {
//   development: {
//     ENV_API: "http://localhost:3001/v1", // 开发环境地址
//     PIC_URL: "http://localhost:3001" // 访问图片
//   },
//   testing: {
//     ENV_API: "http://localhost:3001/v1", // 测试环境地址
//     PIC_URL: "http://localhost:3001" // 访问图片
//   },
//   production: {
//     ENV_API: "http://localhost:3001/v1", // 生产环境地址
//     PIC_URL: "http://localhost:3001" // 访问图片
//   }
// };
