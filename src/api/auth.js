import { httpRequest } from "@/helpers/request.js";

// httpRequest(
//   "/auth/register",
//   "post",
//   {
//     username: "hungers",
//     password: "123456",
//   },
//   "注册"
// ).then((res) => {
//   console.log(res);
// });

const URL = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  GET_INFO: "/auth",
};

export const register = ({ username, password }) =>
  httpRequest(URL.REGISTER, "POST", { username, password }, "注册");
export const login = ({ username, password }) =>
  httpRequest(URL.LOGIN, "POST", { username, password }, "登录");
export const logout = () => httpRequest(URL.LOGOUT);
export const getInfo = () => httpRequest(URL.GET_INFO);
