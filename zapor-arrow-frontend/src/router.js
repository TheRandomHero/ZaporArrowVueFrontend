import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Gallery from './views/Gallery'
import AboutMe from './views/AboutMe'
import Login from './views/Login'
import ViewBlogPost from './views/blogViews/ViewBlogPost'
import BlogPosts from './views/blogViews/BlogPosts'

import firebase from 'firebase'

Vue.use(Router);

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
      component:() => import('./views/UpdateArrow'),
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
      component:() => import('./views/Upload'),
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
      path:'/blog',
      name:'blogPosts',
      component:BlogPosts,
    },
    {
      path:'/view-blog/:id',
      name:'viewBlogPost',
      component:ViewBlogPost,
      props:true,

    },
    {
      path:'/new-blog',
      name:'newBlogPost',
      component:() => import('./views/blogViews/NewBlogPost'),
      meta:{
        requiresAuth:true
      }

    },
    {
      path:'/edit-blog/:id',
      name:'editBlogPost',
      component: () => import('./views/blogViews/EditBlogPost'),
      meta:{
        requiresAuth:true
      },
      props:true,

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