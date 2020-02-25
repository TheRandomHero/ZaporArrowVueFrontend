<template>
  <v-app>
     
    <v-content>
      <router-view></router-view>
    </v-content>
      <app-footer />
  </v-app>
</template>

<script>
  
  import Footer from './components/Footer'

  export default {
    name: 'App',
    components: {
      appFooter: Footer
    }
  };
</script>


<style>

</style>
