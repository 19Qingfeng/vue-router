export default {
  functional: true,
  render(h, { parent, data }) {
    const route = parent.$route;
    // 标示当前渲染的 router-view 属性 dataView 为true
    data.dataView = true;

    let depth = 0;
    // 非根节点
    while (parent && parent._routerRoot !== parent) {
      // parent.$vnode 当前节点的父节点
      // 比如二级前套路由中
      // parent表示当前router-view节点的父亲节点
      // parent.$vnode 表示父节点对应的展位（自定义节点标签） 即可能是 routerView
      // 此时判断它的dataview 上一级 dataView 是否是true
      // 如果是true 那么表示之前已经渲染过一个routerView
      const vnodeData = parent.$vnode ? parent.$vnode.data : {};
      if (vnodeData.dataView) {
        depth++;
      }
      // 递归
      parent = parent.$parent;
    }

    // console.log(ctx.parent, 'parent');

    // console.log(parent.$vnode.dataView, 'dataView');
    // console.log(ctx.parent._vnode, '_vNode');

    // console.log(ctx.parent.$options.name, 'options');
    // let depth = 0;
    // console.log(data, 'data');
    // console.log(parent.$vnode, 'parent');
    // console.log(route, 'parent');
    // console.log(route.matched, 'parent.$route');
    console.log(depth, 'depth');
    const matchRoute = route.matched[depth];
    if (!matchRoute) {
      return h();
    }
    // console.log(depth, 'depth');
    // console.log(matchRoute, 'matchRoute');
    return h(matchRoute.component, data);
  },
};
