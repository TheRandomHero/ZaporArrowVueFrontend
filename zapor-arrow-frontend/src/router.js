import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Home from './views/Home.vue'
import Gallery from './views/Gallery'
import AboutMe from './views/AboutMe'
import UpdateArrow from './views/UpdateArrow'
import Upload from './views/Upload'
import Login from './views/Login'


Vue.use(Router);
Vue.use(VueResource);

const  router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: Gallery
    },
    {
      path:'/arrow/:id',
      name:'arrowPage',
      component:UpdateArrow,
      props: true,
      meta:{
        requiresAuth: true,
      }
    },
    {
      path:'/aboutMe',
      name:'aboutMe',
      component:AboutMe,

    },
    {
      path:'/upload',
      name:'upload',
      component:Upload,
      meta:{
        requiresAuth: true,
      }
    },
    {
      path:'/login',
      name:'login',
      component:Login
    }
  ]
})

router.beforeEach((to, from, next)=>{
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!window.$cookies.isKey('token')){
      next({
        name:'login'
      }
      )
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;