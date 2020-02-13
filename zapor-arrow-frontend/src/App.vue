<template>
  <v-app>
      <app-nav-bar />
    <v-content>
      <router-view></router-view>
    </v-content>
      <app-footer />
  </v-app>
</template>

<script>
  import NavBar from './components/NavBar'
  import Footer from './components/Footer'

  export default {
    name: 'App',
    components: {
      appNavBar: NavBar,
      appFooter: Footer
    }
  };
</script>


<style>

</style>
