<template>
    <v-container>
        <app-nav-bar></app-nav-bar>
        <v-row >
            <v-col cols="8" class="gallery-container">
                <div v-for="(imgId) in imagesIdsForArrow" :key="imgId"  class="image-container">
                    <v-fab-transition>
                        <v-btn
                        class="btn-fix"
                        color="red"
                        absolute
                        top
                        right
                        fab
                        @click.stop="deleteImage(imgId)">
                            <v-icon>fas fa-trash-alt</v-icon>
                        </v-btn>
                    </v-fab-transition>
                   <v-img :src="'http://localhost:63085/api/Images/' + imgId" class="gallery-image"></v-img>
                </div>
            </v-col>
            <v-col cols="4">
                <v-sheet elevation="12">
                    <v-textarea 
                    v-model="arrow"
                    label="Arrow Description"
                    no-resize
                    rounded
                    clearable
                    clear-icon="fas fa-times-circle"></v-textarea>
                    <v-btn class="primary">Edit description</v-btn>
                </v-sheet>
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
                this.arrow = data['description'];
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
        methods:{
            deleteImage(deletingId){
                this.$http.delete('http://localhost:63085/api/Images/',{
                    headers:{
                        'Authorization': 'Bearer ' + this.$cookies.get('token')
                    },
                    body:{'imageId':deletingId}
                })
                .then(
                    console.log(this.$cookies.get('token'))
                
                )
            }
        },
        components:{
            appNavBar: NavBar,
        }
    }
</script>

<style scoped>
    .gallery-container{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .image-container{
        display: flex;
        position: relative;
        max-width: 250px;

    }
    .gallery-image{
        width: 100%;
        z-index: 1;
    }
    .btn-fix:focus::before {
        z-index: 15;
        opacity: 0 !important;
    }
    
</style>