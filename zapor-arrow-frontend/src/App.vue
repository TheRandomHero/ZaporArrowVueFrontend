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
    },
  };
</script>


<style>
  html{
    overflow: auto !important;
    overflow-x: hidden !important;
  
  }
  .myBlurEffect{
        filter: blur(8px);
        -webkit-filter: blur(8px);
    }
  @font-face {
    font-family: "rovas";
    src: local("rovas"),
    url(./assets/fonts/rovas/Nagy_Medve.otf);
  }

  @font-face {
    font-family: "twang";
    src: local("twang"),
    url(./assets/fonts/twang/TwangStd.otf);
  }

  @font-face {
    font-family: "forte";
    src: local("forte"),
    url(./assets/fonts/forte/FORTE.ttf);
  }

  @font-face {
    font-family: "bookAntiqua";
    src: local("bookAntiqua"),
    url(./assets/fonts/bookAntiqua/bookAntiqua.ttf);
  }

  @font-face {
    font-family: "Just Another Hand";
    src: local("JustAnotherHand"),
    url(./assets/fonts/JustAnotherHand/JustAnotherHand-Regular.ttf);
  }

</style>
