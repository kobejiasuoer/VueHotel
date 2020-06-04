import Vue from 'vue'
import Router from 'vue-router'

const Login = ()=> import('../views/login')
const Home = ()=> import(`../views/home`)
const Register = () => import('../views/register')
const Forget = () => import('../views/forget')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forget',
      name: 'Forget',
      component: Forget
    }
  ],
  mode:'history'
})
