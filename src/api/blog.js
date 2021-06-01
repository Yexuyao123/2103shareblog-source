import { httpRequest } from "@/helpers/request.js";

const URL = {
  GET_LIST: "/blog",
  GET_DETAIL: "/blog/:blogId",
  CREATE: "/blog",
  UPDATE: "/blog/:blogId",
  DELETE: "/blog/:blogId",
};

//获取博客列表
//page: 页码，不传默认 page 为1。如果设置该参数则获取博客列表的第 page 页博客列表
// userId: 用户 id，不传则获取全部用户的数据，如果设置则获取某个用户的博客列表
// atIndex: 是否展示在首页，传递 true则只得到显示到首页的博客列表，不传得到全部类型(包括展示到首页和不展示到首页)的博客列表，false得到不展示到首页的列表
export const getBlogs = ({ page = 1, userId, atIndex } = { page: 1 }) => {
  // console.log("开始请求页面" + page);
  return httpRequest(URL.GET_LIST, "GET", { page, userId, atIndex });
};

export const getIndexBlogs = ({ page = 1 } = { page: 1 }) => {
  //拿去展示到首页的博客
  return getBlogs({ page, atIndex: true });
};

export const getBlogsByUserId = (
  userId,
  { page = 1, atIndex } = { page: 1 }
) => {
  return getBlogs({ userId, page, atIndex });
};

export const getDetail = (blogId) => {
  return httpRequest(URL.GET_DETAIL.replace(":blogId", blogId), "Get");
};

export const updateBlog = (
  { blogId },
  { title, content, description, atIndex }
) => {
  return httpRequest(URL.UPDATE.replace(":blogId", blogId), "PATCH", {
    title,
    content,
    description,
    atIndex,
  });
};

export const deleteBlog = ({ blogId }) => {
  return httpRequest(URL.DELETE.replace(":blogId", blogId), "DELETE");
};

export const createBlog = (
  { title = "", content = "", description = "", atIndex = false } = {
    title: "",
    content: "",
    description: "",
    atIndex: false,
  }
) => {
  return httpRequest(URL.CREATE, "POST", {
    title,
    content,
    description,
    atIndex,
  });
};
