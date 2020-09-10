import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Home from './views/Home.vue'
import Gallery from './views/Gallery'
import AboutMe from './views/AboutMe'
import UpdateArrow from './views/UpdateArrow'
import Upload from './views/Upload'
import Login from './views/Login'
import NewArticle from './views/blogViews/NewArticle'
import EditArticle from './views/blogViews/EditArticle'
import ViewArticle from './views/blogViews/ViewArticle'
import Articles from './views/blogViews/Articles'

import firebase from 'firebase'

Vue.use(Router);
Vue.use(VueResource);

const  router = new Router({
  mode: 'history',
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
      path:'/about-me',
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
    },
    {
      path:'/articles',
      name:'articles',
      component:Articles,
    },
    {
      path:'/view-article',
      name:'viewArticle',
      component:ViewArticle,

    },
    {
      path:'/new-article',
      name:'newArticle',
      component:NewArticle,
      meta:{
        requiresAuth:true
      }

    },
    {
      path:'/edit-article',
      name:'EditArticle',
      component:EditArticle,
      meta:{
        requiresAuth:true
      }

    },
  ]
})

router.beforeEach((to, from, next)=>{
  if(to.matched.some(record => record.meta.requiresAuth)){
    firebase.auth().onAuthStateChanged(user =>{
      if(!user){
        next({
          name:'login'
        })
      } else {
        next()
      }
    })

    } else {
      next()
    }
})

export default router;