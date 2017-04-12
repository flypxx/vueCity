/**
 * parse url param
 * @example ?phone=123232&num=121223
 * @return Object {phone: 123232, num: 121223}
 */
export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  if (arr) {
    arr.forEach((item) => {
      let tmpArr = item.substr(1).split('=');
      let key = decodeURIComponent(tmpArr[0]);
      let val = decodeURIComponent(tmpArr[1]);
      obj[key] = val;
    });
  }
  return obj;
};
