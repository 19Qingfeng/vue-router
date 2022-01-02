/**
 *
 * 根据当前路径寻找匹配的所有路由记录
 * @export
 * @param {*} record 当前路径对应记录（精确匹配不包含parent）
 * @param {*} location 当前路径
 * @returns
 */
export function createRoute(record, location) {
  const matched = [];

  if (record) {
    // 寻找全量匹配结果
    while (record) {
      matched.unshift(record);
      record = record.parent;
    }
  }

  return {
    matched, // 匹配到的所有路由对象结果
    ...location,
  };
}

class BaseHistory {
  constructor(router) {
    this.router = router;
    // 当前路径匹配的路由对象表（包含当前location匹配的所有嵌套路由关系）
    // 页面跳转时根据this.current值改变 根据匹配的matched结果进行页面渲染
    this.current = createRoute(null, {
      path: '/',
    });
  }

  /**
   * 核心跳转逻辑
   * 根据路径地址寻找对应的record匹配对象
   * 渲染对应组件到页面上
   * 每次页面跳转都会调用这个方法
   * @param {*} location
   * @param {*} onComplete
   */
  transitionTo(location, onComplete) {
    // 寻找即将跳转路径匹配到的路由对象
    const record = this.router.matcher.match(location);

    // 判断是否是跳转的相同路径 路径相同 matched匹配的个数也相同
    if (
      location === this.current.path &&
      this.current.matched.length === record.matched.length
    ) {
      return;
    }
    console.log('更新一次*********');

    // 此时我应该修改current的值
    this.updateRoute(record);
    onComplete && onComplete();
  }

  // 更新current的值
  updateRoute(record) {
    this.current = record;
    this.cb && this.cb(record);
  }

  // 监听响应式数据修改
  listen(cb) {
    this.cb = cb;
  }
}

export default BaseHistory;
