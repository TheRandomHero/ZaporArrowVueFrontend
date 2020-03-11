<template>
    <v-container fluid>
        <v-row width="200px">
            <app-nav-bar :bg="image" class="gallery-bg"/>
        </v-row>
        <v-row >
         <app-nav-bar></app-nav-bar>
            <v-col class="col-lg-8 offset-lg-2">
                <v-row class="mx-5">
                    <v-col v-for="(arrId, imgId) in ids" :key="imgId" class="col-lg-4 col-md-6 col-sm-8">
                        <image-pop-up :imageId="imgId" :arrowId ="arrId"/>
                    </v-col>
                </v-row>
            </v-col>
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
        }
    }
</script>
<style scoped>
    .gallery {
            position: relative;
            background-image: url('../assets/mainbg.png');
            width: 100%;
            height: auto;
            padding-top: 20%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .main-title{
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sansp
        }
        .container{
        padding: 0px
    }
    
</style>