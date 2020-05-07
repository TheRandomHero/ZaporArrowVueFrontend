<template>
    <v-container fluid>
        <v-row>
            <app-nav-bar />
        </v-row>
        <v-row>
            <v-col cols="8">
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
            <v-col cols="4">
                <v-img src="./../assets/profil.jpg"></v-img>
            </v-col>
        </v-row>
    </v-container>    
</template>

<script>
import NavBar from './../components/NavBar.vue'

export default {
    components:{
      appNavBar: NavBar,
    },
    mounted() {
        console.log(process.env.NODE_ENV)
        console.log(process.env.VUE_APP_ROOT_API)
    }
}
</script>

<style scoped>

</style>