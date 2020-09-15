import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Home from './views/Home.vue'
import Gallery from './views/Gallery'
import AboutMe from './views/AboutMe'
import UpdateArrow from './views/UpdateArrow'
import Upload from './views/Upload'
import Login from './views/Login'
import NewBlogPost from './views/blogViews/NewBlogPost'
import EditBlogPost from './views/blogViews/EditBlogPost'
import ViewBlogPost from './views/blogViews/ViewBlogPost'
import BlogPosts from './views/blogViews/BlogPosts'

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
      path:'/blog-posts',
      name:'blogPosts',
      component:BlogPosts,
    },
    {
      path:'/view-blog-post/:id',
      name:'viewBlogPost',
      component:ViewBlogPost,
      props:true,

    },
    {
      path:'/new-blog-post',
      name:'newBlogPost',
      component:NewBlogPost,
      meta:{
        requiresAuth:true
      }

    },
    {
      path:'/edit-blog-post/:id',
      name:'editBlogPost',
      component:EditBlogPost,
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