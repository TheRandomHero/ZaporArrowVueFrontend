<template>
    <v-container fluid :class="{myBlurEffect: isActive}">
        <v-row width="100%">
            <app-nav-bar :bg="image"/>
        </v-row>
        <app-nav-bar></app-nav-bar>
        <v-row >
            <v-col cols="10" offset="1"  class="gallery">
                <div v-for="(tag, index) in tags" :key="index">
                    <image-pop-up :imageTag="tag" :profilPublicId="publicIds[index]"  @blurBackground="changeBackground"/>
                </div>

            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import NavBar from './../components/NavBar.vue'
import background from './../assets/gallery-bg.jpg'
import Popup from './../components/ImagePopUp'
import axios from 'axios';
import { mapGetters} from 'vuex'

export default {
    data() {
        return {
            tags:[],
            ids: null,
            isActive:false,
            image:background,
            dialog:false
        }
    },
    components:{
      appNavBar: NavBar,
      ImagePopUp: Popup,
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
        }
    },
    computed:{
        ...mapGetters([
            'getGalleryImagesIds'
        ])
    }
    }
</script>
<style scoped>
    .gallery {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
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
