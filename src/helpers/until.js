export const countDayTime = (time) => {
  const lastTime = new Date(time).getTime();
  const nowTime = new Date().getTime();
  //计算相差毫秒数
  const space = nowTime - lastTime;
  //求天数取整
  const daySpace = Math.floor(space / (24 * 60 * 60 * 1000));
  if (daySpace >= 365) {
    const yearSpace = Math.floor(daySpace / 365);
    return yearSpace + " 年前";
  } else if (daySpace >= 30) {
    const monthSpace = Math.floor(daySpace / 30);
    return monthSpace + " 个月前";
  } else if (daySpace !== 0) {
    return daySpace + " 天前";
  } else {
    const hourSpace = Math.floor(
      (space % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
    );
    if (hourSpace !== 0) {
      return hourSpace + " 小时前";
    } else {
      const secSpace = Math.floor(
        ((space % (24 * 60 * 60 * 1000)) % (1000 * 60 * 60)) / (1000 * 60)
      );
      return secSpace + " 分钟前";
    }
  }
};

export const translateTime = (time) => {
  const addZero = function (value) {
    return value < 10 ? "0" + value : value;
  };
  const date = new Date(time);
  const year = date.getFullYear();
  const month = addZero(date.getMonth() + 1);
  const day = addZero(date.getDate());
  const hours = addZero(date.getHours());
  const min = addZero(date.getMinutes());
  const sec = addZero(date.getSeconds());
  return {
    total: `${year}年${month}月${day}日 ${hours}:${min}:${sec}`,
    year,
    month,
    day,
  };
};

export const getSymbol = (key) => {
  return Symbol(key);
};

export const smoothlyToTop = () => {
  const TWEEN = require("@tweenjs/tween.js");
  function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
  }
  requestAnimationFrame(animate);
  const coords = { y: window.scrollY };
  new TWEEN.Tween(coords)
    .to({ y: 0 }, 500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      window.scrollTo(0, coords.y);
    })
    .start();
};

export const checkUsername = (value) => {
  const _value = value ? value.trim() : "";
  if (!_value) {
    return "用户名不能为空";
  }
  //用户名，长度1到15个字符，只能是字母数字下划线中文
  //regex.test(value)表示value含有regex匹配的字符串就返回true
  //[^……]表示不在……匹配的字符串里
  const regex = /^[A-Za-z0-9_\u4e00-\u9fa5]*$/;
  if (!regex.test(_value)) {
    return "用户名只能由字母、数字、下划线、中文组成";
  }
  if (_value.length < 1 || _value.length > 15) {
    return "用户名长度为1到15个字符";
  }
};

export const checkUserPassword = (value) => {
  //密码, 长度6到16个任意字符
  const _value = value ? value.trim() : "";
  if (!_value) {
    return "密码不能为空";
  }
  if (_value.length < 6 || _value.length > 16) {
    return "密码长度为6到16个任意字符";
  }
};

export const checkBlogTitle = (value) => {
  //title : 博客标题, 博客标题不能为空，且不超过100个字符
  const _value = value ? value.trim() : "";
  if (_value.length < 10 || _value.length > 100) {
    return "博客标题至少10个字符，且不超过100个字符";
  }
};

export const checkBlogDescribe = (value) => {
  // description: 博客内容简要描述,可为空，如果为空则后台自动从content 中提取
  const _value = value ? value.trim() : "";
  if (_value.length < 30) {
    return "内容简要描述不少于30个字符";
  }
};

export const checkBlogContent = (value) => {
  // content : 博客内容, 博客内容不能为空，且不超过10000个字符
  const _value = value ? value.trim() : "";
  if (_value.length < 200 || _value.length > 1000) {
    return "博客内容不少于200个字符，且不超过1000个字符";
  }
};

export const checkPhone = (value) => {
  const p = new RegExp(/^1[34578]\d{9}$/);
  if (value === "") {
    // 手机号不能为空！
  } else if (!value.match(p)) {
    // 手机号有误，请修正！
  } else {
    //
  }
};

export const checkEmail = (value) => {
  const re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  if (!re.test(value)) {
    //邮箱格式不正确！
  } else {
    //
  }
};

import { Loading } from "element-ui";
export const loading = (delay = 100) => {
  const loading = Loading.service({
    lock: true,
    text: "Loading",
    spinner: "el-icon-loading",
    background: "rgba(255,255, 255, .7)",
  });
  const close = () => {
    setTimeout(() => {
      loading.close();
    }, delay);
  };
  return {
    loading,
    close,
  };
};
