<template>
    <v-container>
        <app-nav-bar></app-nav-bar>
        <v-row >
            <v-col cols="6" class="image-container">
                <div v-for="(imgId) in imagesIdsForArrow" :key="imgId" class="gallery-content">
                   <v-img :src="'http://localhost:63085/api/Images/' + imgId"></v-img>
                </div>
            </v-col>
            <v-col cols="6">
                <v-card>
                    <p v-if="arrow">{{arrow.description}}</p>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import NavBar from './../components/NavBar';


    export default {
        props: ['id'],

        data() {
            return {
                arrow:null,
                imagesIdsForArrow:[],
                
            }
        },
        created(){
            this.$http.get('http://localhost:63085/api/Arrow/arrowDescription/' + this.id)
            .then(response => {
                return response.json();
            })
            .then(data =>{
                this.arrow = data;
            });

            this.$http.get('http://localhost:63085/api/Images/getall/' + this.id)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    for(let id in data){
                        this.imagesIdsForArrow.push(data[id])
                    }
                })
        },
        components:{
            appNavBar: NavBar,
        }
    }
</script>

<style scoped>
    .image-container{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
</style>