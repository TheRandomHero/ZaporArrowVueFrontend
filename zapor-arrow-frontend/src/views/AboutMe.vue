<template>
    <v-content>

        <app-nav-bar header-title="Rólam" />
        <v-row class="about-context">
            <v-col lg="4" md="8" offset-md="2" sm="8" offset-sm="2">
                <v-img src="./../assets/profil.jpg"></v-img>
            </v-col>
            <v-col lg="8" md="8" offset-md="2" sm="8" offset-sm="2">
                <div>
                    <p>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </p>
                </div>
            </v-col>
           
            <app-footer></app-footer>
        </v-row>
    </v-content>    
</template>

<script>
import NavBar from './../components/NavBar.vue'
import Footer from './../components/Footer'

export default {
    components:{
      appNavBar: NavBar,
      appFooter: Footer,
    }
}
</script>

<style scoped>
    .about-context{
        height: 100vh;
        width: 100%;
    }
</style>