<template>
    <v-container fluid :class="{myBlurEffect: isActive}">
        <v-row width="100%">
            <app-nav-bar :bg="image"/>
        </v-row>
        <app-nav-bar></app-nav-bar>
        <v-row >
            <v-col cols="10" offset="1"  class="gallery">
                <div v-for="(tag, index) in tags" :key="index">
                    <image-pop-up :imageTag="tag"  @blurBackground="changeBackground"/>
                    <cld-image :publicId="publicIds[index]" cloudName="dwqs04xan">
                        <cld-transformation crop="scale" width="200" height="200" />
                    </cld-image>
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
import { CldImage, CldTransformation } from 'cloudinary-vue'

export default {
    data() {
        return {
            publicIds:[],
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
      CldImage,
      CldTransformation
    },
    mounted() {
        axios.get(
            'https://res.cloudinary.com/dwqs04xan/image/list/profil.json',{
                headers:{
                    'Access-Control-Allow-Origin': '*',
               
                }
            })
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
        justify-content: center;
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
