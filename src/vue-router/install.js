import RouterLink from './components/link';
import RouterView from './components/view';

export let _Vue;

// install 添加mixin 让所有组件可以访问到router route 对象
// 其次 挂载原型代理/注册组件 router-link router-view
export default function install(Vue, options) {
  _Vue = Vue;

  // 为每一个component注入router相关
  Vue.mixin({
    // 组件渲染时created是从父往子去掉用的
    beforeCreate() {
      // 让所有组件都可以拥有router相关
      // 共享父亲实例对象 也就是说子每个组件都可以通过 this.$parent._routerRoot 获得根组件实例对象
      if (this.$options.router) {
        // 如果传入了router配置
        this._routerRoot = this;
        // 根组件上挂在router对象
        this._router = this.$options.router;
        // 同时调用init方法初始化 这里的this一定是根组件实例
        this._router.init(this);
        // init之后获得当前页面匹配的路由对象 将它定义为响应式的对象
        Vue.util.defineReactive(this, '_route', this._router.history.current);
        // Vue.util.defineReactive()
      } else {
        // 如果非分跟节点 从上上一级的跟节点上取_routerRoot根实例对象
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    },
  });

  // 原型方法
  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router;
    },
  });
  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot._route;
    },
  });

  // 注册组件
  Vue.component('router-link', RouterLink);
  Vue.component('router-view', RouterView);
}
