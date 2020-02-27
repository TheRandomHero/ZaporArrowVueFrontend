<template>
    <v-container fluid>
        <app-nav-bar />
        <v-layout class="gallery" justify="center" align="center">
            <v-col class="col-lg-6 offset-lg-3" >
                <p class="display-3 font-weight-bold main-title">Gallery</p>
            </v-col>
        </v-layout>
        <v-row >
         <app-nav-bar></app-nav-bar>
            <v-col class="col-lg-8 offset-lg-2">
                <v-row class="mx-5">
                    <v-col v-for="id in arrowsIds" :key="id" class="col-lg-4">
                        <v-card :href="'/arrow/' + id"  max-width="300" max-height="300" class="text-center">
                            <v-img :src="'http://localhost:63085/api/Images/' + id" class="align-center"></v-img>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import NavBar from './../components/NavBar.vue'

export default {
    data() {
        return {
            arrowsIds:[]
        }
    },
    components:{
      appNavBar: NavBar,
    },
    async mounted() {
        this.$http.get('http://localhost:63085/api/gallery')
            .then(response => {
                return response.json();
            })
            .then(data =>{
                for(let key in data){
                    this.arrowsIds.push(data[key])
                }
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