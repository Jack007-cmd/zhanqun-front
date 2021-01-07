var common = {
  randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },
  chooseImg(e, num, a, b) {
    //上传图片
    a = e.target.files[0];
    var file = e.target.files[0];
    if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
      alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
      return false
    }
    var reader = new FileReader();
    reader.onload = (e) => {
      let data;
      if (typeof e.target.result === 'object') {
        // 把Array Buffer转化为blob 如果是base64不需要
        data = window.URL.createObjectURL(new Blob([e.target.result]))
      } else {
        data = e.target.result
      }
      if (num === 1) {
        b = data;
      }
    }
    // 转化为base64
    reader.readAsDataURL(file)
    // 转化为blob
    // reader.readAsArrayBuffer(file);
  },
};
export default common
