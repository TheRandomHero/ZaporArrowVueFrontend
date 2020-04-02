<template>
    <v-container fluid :class="{myBlurEffect: isActive}">
        <v-row width="200px">
            <app-nav-bar :bg="image" class="gallery-bg"/>
        </v-row>
        <v-row >
         <app-nav-bar></app-nav-bar>
            <v-col class="col-lg-8 offset-lg-2">
                <div class="gallery">
                    <div class="gallery-panel"
                    v-for="(arrId, imgId) in ids" :key="imgId">
                        <image-pop-up :imageId="imgId" :arrowId ="arrId" @blurBackground="changeBackground"/>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
            <!-- <v-row class="mx-5">
                <v-col v-for="(arrId, imgId) in ids" :key="imgId" class="col-lg-4 col-md-6 col-sm-8">
                    
                </v-col>
            </v-row> -->
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
    .gaallery {
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

    .myBlurEffect{
        filter: blur(6px);
        -webkit-filter: blur(6px);
    }

    .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-gap: 1rem;
    max-width: 80rem;
    margin: 5rem auto;
    padding: 0 5rem;
    }
    .gallery-panel img {
        width: 100%;
        height: 22vw;
        object-fit: cover;
        border-radius: 0.75rem;
    }

</style>