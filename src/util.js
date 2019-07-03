export function getRedirectPath({
  type,
  avatar
}) {
  // 根据用户信息 返回跳转地址
  // type: /boss /senior
  // avatar: /bossinfo /seniorinfo
  let url = (Number(type) === 1) ? '/boss' : '/senior'
  if (!avatar) {
    url += 'info'
  }
  return url
}

export function getChatid(userid, targetid) {
  return [userid, targetid].sort().join('_')
}

//识别苹果X
export function isIphoneX() {
  return /iphone/gi.test(navigator.userAgent) && (window.screen.height === 812 && window.screen.width === 375)
}