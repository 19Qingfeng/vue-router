import createMatcher from './create-matcher';
import HashHistory from './history/hash';
import HTML5History from './history/history';
import install from './install';

class VueRouter {
  constructor(options) {
    this.options = options;
    // 匹配器 扁平化options.routes对象
    this.matcher = createMatcher(options.routes || []);
    // 路由模式 仅考虑浏览器中的history和hash 不考虑SSR中的 abstract
    this.mode = options.mode || 'hash';
    switch (this.mode) {
      case 'hash':
        this.history = new HashHistory(this);
        break;
      case 'history':
        this.history = new HTML5History(this);
        break;
      default:
        break;
    }
  }

  // 跳转方法
  push(location) {
    // 调用 history.transitionTo 跳转
    this.history.push(location);
  }

  // 初始化方法
  init(rootInstance) {
    const history = this.history;
    // 根据当前路由初始化页面 并且随后监听hash变化切换页面显示组件
    // 监听函数
    const setupHashListener = () => {
      // 调用路由hash变化监听函数
      history.setupListener();
    };

    // 页面首次加载 渲染当前路由 监听路由变化事件
    history.transitionTo(
      // 获得当前路由信息
      history.getCurrentLocation(),
      // 设置监听函数
      setupHashListener
    );

    // 初始化时代理响应式数据修改
    history.listen((route) => {
      // this.apps.forEach((app) => {
      // 让route改变 实时修改 rootInstance._route 响应式属性
      rootInstance._route = route;
      console.log(rootInstance._route, 'rootInstance._route ');
      // });
    });
  }
}

VueRouter.install = install;

export default VueRouter;
