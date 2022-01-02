import Vue from 'vue';
// import VueRouter from 'vue-router';
import VueRouter from '../vue-router/index';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'a',
        name: 'a',
        component: {
          render: (h) => <div>a</div>,
        },
      },
      {
        path: 'b',
        name: 'b',
        component: {
          render: (h) => <div>b</div>,
        },
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    children: [
      {
        path: 'about1',
        name: 'About1',
        component: {
          name: 'about111',
          render: (h) => <div>a</div>,
        },
      },
      {
        path: 'about2',
        name: 'about2',
        component: {
          render: (h) => <div>b</div>,
        },
      },
    ],
  },
  {
    path: '/about/c',
    name: 'Aboutc',
    component: {
      render: (h) => <div>ccccc</div>,
    },
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

router.matcher.addRoutes([
  {
    path: '/19Qingfeng',
    name: '19Qingfeng',
    component: {
      render: (h) => <div>19Qingfeng</div>,
    },
  },
  {
    path: '/wang',
    name: 'wang',
    component: {
      render: () => <div>wang</div>,
    },
    children: [
      {
        path: 'haoyu',
        name: 'haoyu',
        component: {
          render: (h) => <div>haoyu</div>,
        },
      },
    ],
  },
]);

export default router;
