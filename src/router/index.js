import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';
const Login = () => import('@/views/Login');
const User = () => import('@/views/User');
const Home = () => import('@/views/Home');
const SpecialPractice = () => import('@/views/SpecialPractice');
const TestHistory = () => import('@/views/TestHistory');
const ErrorDataBank = () => import('@/views/ErrorDataBank');
const RandomPractice = () => import('@/views/RandomPractice');
const QuestionCollection = () => import('@/views/QuestionCollection');

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
    path: 'special-practice',
    name: 'SpecialPractice',
    component: SpecialPractice
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
  },
  {
    path: 'random-practice',
    name: 'RandomPractice',
    component: RandomPractice
  },
  {
    path: 'question-collection',
    name: 'QuestionCollection',
    component: QuestionCollection
  },
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
  if (!sessionStorage.getItem('Authorization') && to.fullPath !== '/login') {
    next('/login')
  } else {
    store.commit('updateBreadcrumbs', to)
    next()
  }
})

export default router
