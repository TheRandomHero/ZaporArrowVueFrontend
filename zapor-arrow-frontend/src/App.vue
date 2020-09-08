<template> 
  <v-app>
    <v-main>
      <router-view :class="{myBlurEffect : isActive}" v-on:blurBackground="changeBackground()"></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return{
        isActive: false
      }
    },
    methods:{
      changeBackground(){
        this.isActive = !this.isActive
      }
    }
  };
</script>


<style>
    ::-webkit-scrollbar {
    display: none;
}

  @font-face {
    font-family: "rovas";
    src: local("rovas"),
    url(./assets/fonts/rovas/Nagy_Medve.otf);
  }


  .myBlurEffect{
        filter: blur(8px);
        -webkit-filter: blur(8px);
    }
</style>
