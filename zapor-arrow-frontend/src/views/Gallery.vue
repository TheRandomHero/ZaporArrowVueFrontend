<template>
    <v-container fluid :class="{myBlurEffect: isActive}">
        <v-row width="200px">
            <app-nav-bar :bg="image"/>
        </v-row>
        <app-nav-bar></app-nav-bar>
        <v-row class="gallery" >
            <div v-for="(arrId, imgId) in ids" :key="imgId" class="gallery-content">
                <image-pop-up :imageId="imgId" :arrowId ="arrId" @blurBackground="changeBackground"/>
            </div>
        </v-row>
    </v-container>
            
</template>


<script>
import NavBar from './../components/NavBar.vue'
import background from './../assets/gallery-bg.jpg'
import Popup from './../components/ImagePopUp'

export default {
    data() {
        return {
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
        this.$http.get('http://localhost:63085/api/gallery')
            .then(response => {
                return response.json();
            })
            .then(data =>{
                    this.ids = data
            });
        },
    methods:{
        changeBackground(){
            this.isActive = !this.isActive
        }
    }
    }
</script>
<style scoped>
    .gallery {
        display: flex;
        justify-content: flex-start;
        min-width: 100%;
    }

    .main-title{
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sansp
    }

    .myBlurEffect{
        filter: blur(6px);
        -webkit-filter: blur(6px);
    }


</style>
