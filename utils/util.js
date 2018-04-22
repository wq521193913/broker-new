const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const checkPhone = phone => {
  if(!phone) return false;
  let reg = /^1[34578]\d{9}/;
  if (reg.test(phone)) {
    return true;
  }
  return false;
}

const wxRequest = options => {
  
    options = options || {};
    options.url = options.url || '';
    options.method = options.method || 'GET';
    options.data = options.data || '';
    options.header = {
      "session_3rd": wx.getStorageSync("session_3rd"),
      "content-type":'application/x-www-form-urlencoded'
    };
    options.success = options.success || function () {};
    options.fails = options.fail || function (res){console.log(res)};

    wx.request({
      url: options.url,
      method: options.method,
      data: options.data,
      header: options.header,
      success: options.success,
      fail: options.fail
    });
}

const fullData = obj =>{
  if(!obj) return obj;
  const ret = {};
  for(var key in obj){
    ret[key] = obj[key]
  }
  return ret;
}

module.exports = {
  formatTime: formatTime,
  checkPhone: checkPhone,
  wxRequest: wxRequest,
  fullData: fullData
}


