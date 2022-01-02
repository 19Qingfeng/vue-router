/**
 * 扁平化路由配置
 * 1. 初始化扁平路由配置
 * 2. 动态添加路由时 同样支持扁平化添加
 * @param {*} routes 需要添加的路由
 * @param {*} oldMap 原本的路由列表
 */
export default function createRouteMap(routes, oldPathMap) {
  // 路径映射表
  const pathMap = oldPathMap || Object.create(null);

  routes.forEach((route) => {
    addRouteRecord(route, pathMap);
  });

  return {
    pathMap,
  };
}

function addRouteRecord(route, pathMap, parentRecord) {
  // 当前配置路由
  const currentConfigPath = route.path;

  let path;
  // 如果当前配置一 / 开头，不需要任何拼接
  if (currentConfigPath.startsWith('/')) {
    path = currentConfigPath;
  } else {
    path = parentRecord
      ? // 父路由结尾是否是/
        parentRecord.path.endsWith('/')
        ? `${parentRecord.path}${currentConfigPath}`
        : `${parentRecord.path}/${currentConfigPath}`
      : currentConfigPath;
  }
  const record = {
    path,
    component: route.component,
    name: route.name,
    props: route.props || {},
    meta: route.meta || {},
    parent: parentRecord,
  };

  if (!pathMap[path]) {
    // 避免重复添加
    pathMap[path] = record;
  }

  // 递归儿子节点 深度先序遍历
  if (route.children) {
    route.children.forEach((childRoute) => {
      addRouteRecord(childRoute, pathMap, record);
    });
  }
}
