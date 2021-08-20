import baseUrl from "./url.js";
import { encode } from "@/utils/encode";

const request = async (options) => {
  options.url = baseUrl + options.url;

  try {
    const token = uni.getStorageSync("user_token");
    // 将获取到token加入到请求头中
    if (token) {
      options.header = {
        Authorization: encode(token),
        // "Content-Type": "application/json",
        "content-type": "application/x-www-form-urlencoded",
      };
    }
  } catch (err) {
    console.log(err);
  }

  let result = await uni.request(options);

  if (result[1].statusCode == 403) {
    //   清除缓存token
    uni.removeStorageSync("user_token");
    //   清除缓存用户信息
    uni.removeStorageSync("user_info");

    uni.navigateTo({
      url: "/pages/login/index",
    });
    return;
  }

  return result[1];
};

export default request;
