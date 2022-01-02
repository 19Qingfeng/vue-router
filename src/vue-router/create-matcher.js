import createRouteMap from './create-route-map';
import { createRoute } from './history/base';

export default function createMatcher(routers) {
  // TODO: pathList nameMap
  const { pathMap } = createRouteMap(routers);

  function addRoute(route) {
    createRouteMap([route], pathMap);
    console.log('添加完成：', pathMap);
  }

  function addRoutes(routes) {
    createRouteMap(routes, pathMap);
    console.log('添加完成：', pathMap);
  }

  /**
   *
   * 根据路径寻找匹配的路由对象
   * @param {*} location
   * @returns
   */
  function match(location) {
    return pathMap[location]
      ? createRoute(pathMap[location], {
          path: location,
        })
      : createRoute(null, {
          path: location,
        });
  }

  return {
    match, // 通过路径匹配路由对象
    addRoute, // 动态注册路由页面
    addRoutes, // 动态注册多个路由页面
  };
}
