export function dateFormat(time, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, new Date(time).getFullYear().substr(4 - RegExp.$1.length));
  }
};
