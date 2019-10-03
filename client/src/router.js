import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Menu from '@/components/Menu/Menu'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
import Profile from '@/components/Menu/Profile'
import Product from '@/components/Menu/Products'
import UserBoard from '@/components/Menu/UserBoard'
import PostList from '@/components/Posts/PostList'
import Details from '@/components/Posts/Details'
import Posts from '@/components/Menu/Posts'
import Users from '@/components/Menu/Users'

Vue.use(Router)

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/posts',
      name: 'PostList',
      component: PostList
    },
    {
      path: '/details',
      name: 'Details',
      component: Details
    },
    {
      path: '',
      name: 'menu',
      component: Menu,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'user',
          name: 'User',
          component: Users
        },
        {
          path: 'post',
          name: 'Post',
          component: Posts
        },
        {
          path: 'product',
          name: 'Product',
          component: Product
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile
        },
        {
          path: 'userboard',
          name: 'UserBoard',
          component: UserBoard
        },
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
})


Vue.component('Navbar', require('./components/Navbar.vue').default);
Vue.component('Hero', require('./components/Hero.vue').default);
Vue.component('posts-component', require('./components/Posts/Posts.vue').default);
Vue.component('Footer', require('./components/Footer.vue').default);

router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = localStorage.usertoken == undefined ? false : true
  if (requiresAuth && !currentUser) {
    next('/')
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }

})


export default router;