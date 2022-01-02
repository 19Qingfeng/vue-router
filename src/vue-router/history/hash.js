import BaseHistory from './base';

export function getHash() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  let href = window.location.href;
  const index = href.indexOf('#');
  // empty path
  if (index < 0) return '';
  href = href.slice(index + 1);
  return href;
}

/**
 * 确保hash存在#
 */
function ensureSlash() {
  const path = getHash();
  if (path.startsWith('/')) {
    return true;
  }
  // 不存在hash时默认给一个hash /根路径
  window.location.hash = '/';
  return false;
}

class HashHistory extends BaseHistory {
  constructor(router) {
    super(router);
    // 初始化页面存在hash模式的# 如果当前页面不存在hash 那么就给一个默认的拼接 #/
    ensureSlash();
  }

  // 监听函数
  setupListener() {
    window.addEventListener('hashchange', () => {
      this.transitionTo(getHash());
    });
  }

  // 跳转方法
  push(location) {
    this.transitionTo(location, () => {
      window.location.hash = location;
    });
  }

  // 获得当前路径
  getCurrentLocation() {
    return getHash();
  }
}

export default HashHistory;
