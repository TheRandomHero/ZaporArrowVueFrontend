<template> 
  <v-app>
    <v-main>
      <router-view :class="{myBlurEffect : isActive}" v-on:blurBackground="changeBackground()"></router-view>
    </v-main>
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
