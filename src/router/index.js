import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/Login');
const User = () => import('@/views/User');
const Home = () => import('@/views/Home');
const QuestionLibrary = () => import('@/views/QuestionLibrary');
const TestHistory = () => import('@/views/TestHistory');
const ErrorDataBank = () => import('@/views/ErrorDataBank');

Vue.use(VueRouter)

const userChildren = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: 'home',
    name: 'Home',
    component: Home
  },
  {
    path: 'question-library',
    name: 'QuestionLibrary',
    component: QuestionLibrary
  },
  {
    path: 'test-history',
    name: 'TestHistory',
    component: TestHistory
  },
  {
    path: 'error-data-bank',
    name: 'ErrorDataBank',
    component: ErrorDataBank
  }
]

const routes = [
  {
    path: '/',
    redirect: '/user'
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    children: userChildren
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('token') || to.fullPath === '/login') {
    next()
  } else {
    next('/login')
  }
})

export default router
