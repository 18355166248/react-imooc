

export function getRedirectPath({type, avatar}) {
  // 根据用户信息 返回跳转地址
  // type: /boss /senior
  // avatar: /bossinfo /seniorinfo
  let url = (Number(type) === 1) ? '/boss' : '/senior'
  if (!avatar) {
    url += 'info'
  }
  return url
}