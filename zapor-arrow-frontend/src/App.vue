<template> 
  <v-app>
    <v-content>
      <router-view :class="{myBlurEffect : isActive}" v-on:blurBackground="changeBackground()"></router-view>
    </v-content>
      <app-footer />
  </v-app>
</template>

<script>
  
  import Footer from './components/Footer'

  export default {
    name: 'App',
    data(){
      return{
        isActive: false
      }
    },
    components: {
      appFooter: Footer
    },
    methods:{
      changeBackground(){
        this.isActive = !this.isActive
        console.log('blur')
      }
    }
  };
</script>


<style>

  .myBlurEffect{
        filter: blur(8px);
        -webkit-filter: blur(8px);
    }
</style>
