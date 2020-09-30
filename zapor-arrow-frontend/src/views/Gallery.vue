<template>
    <v-container fluid :class="{myBlurEffect: isActive}">
        <!-- <div v-if="user.loggedIn" class="alert alert-success" role="alert">You are logged in! <button @click="signOut">Sign Out</button></div> -->
        <v-row style="padding-bottom:200px">
        <app-nav-bar header-title="Galéria"></app-nav-bar>
            <v-col cols="10" offset="1"  class="gallery">
                <div v-for="(tag, index) in tags" :key="index">
                    <image-pop-up :imageTag="tag" :profilPublicId="publicIds[index]"  @blurBackground="changeBackground"/>
                </div>
            </v-col>
        </v-row>
        <app-footer></app-footer>
    </v-container>
</template>


<script>
import NavBar from './../components/NavBar.vue' 
import Popup from './../components/ImagePopUp'
import Footer from './../components/Footer'
import axios from 'axios';
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            tags:[],
            ids: null,
            isActive:false,
            dialog:false
        }
    },
    components:{
      appNavBar: NavBar,
      ImagePopUp: Popup,
      appFooter: Footer
    },
    mounted() {
        axios.get('https://res.cloudinary.com/dwqs04xan/image/list/profil.json')
            .then((res) => {
                this.publicIds = res.data.resources.map(p =>{
                    return p.public_id
                })
                this.tags = res.data.resources.map(t =>{
                    let str = t.public_id;
                    return str.slice(0, str.indexOf("/"))
                }) 
            })
        },
    methods:{
        changeBackground(){
            this.isActive = !this.isActive
        },
        
    },
    computed:{
        ...mapGetters({
            user: 'user'
        }
        )
    }
    }
</script>
<style scoped>

    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-gap: 15px;
        justify-content: center;
        overflow:auto;
    }
    .gallery div{
        margin: auto;
        padding: auto;
    }
    .main-title{
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sansp
    }

    .container{
        padding: 0px;
    }
    .myBlurEffect{
        filter: blur(6px);
        -webkit-filter: blur(6px);
    }


</style>
