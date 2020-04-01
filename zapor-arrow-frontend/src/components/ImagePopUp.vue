
<template>
    <v-dialog v-model="dialog" fullscreen>
        <template v-slot:activator="{ on }">
            <v-row>
                <v-col>
                    <v-btn text v-on="on" min-width="250" min-height="250" rounded>
                        <v-card max-width="250" max-height="250" class="text-center">
                            <v-img :src="'http://localhost:63085/api/Images/' + imageId" class="align-center" width="100%" height="100%"></v-img>
                        </v-card>
                    </v-btn>
                </v-col>
            </v-row>
        </template>
        <v-container fluid @click="close" class="popup">
            
            <v-row align-content="start" justify="center">
                <v-col cols="8">
                    <v-img :src="imgUrl"  alt="align-center" width="60%" height="100%" @click.stop="next" ></v-img>
                </v-col>
                <v-col cols="4">
                    <v-card flat tile >
                        <v-card-title>Description: </v-card-title>
                        <v-card-text v-if="arrow">{{ arrow.description }}</v-card-text>
                </v-card>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col class="image-container" cols="8" offset="2">
                    <v-row >
                        <v-col v-for="(id, i) in imageIdsForArrow" :key="i" cols="4">
                            <v-card flat style="background-color:transparent"> 
                                <v-row>
                                    <v-btn v-if="isLoggedIn"
                                    color="red"
                                    class="btn-fix"
                                    fab
                                    @click.stop="deleteImage(id)">
                                        <v-icon >fas fa-trash-alt</v-icon>
                                    </v-btn>
                                    
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="isLoggedIn"
                                    fab class="btn-fix">
                                        <v-icon>fas fa-edit</v-icon>
                                    </v-btn>
                                </v-row>
                                <v-img :src="'http://localhost:63085/api/Images/' + id"
                                class="img-thumbs"
                                :class="{'img-thumbs--active' : i === imgIndex}" 
                                alt="align-center" width="100%" height="100%"  
                                @click.stop="changeMainImage(i)">
                                </v-img>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-dialog>
</template> 

<script>
export default {
    data(){
        return{
            dialog:false,
            imgIndex:0,
            arrow:null,
            loader: true,
            mainImage:null,
            imageIdsForArrow:[],
        }
    },
    props:{
        arrowId: String,
        imageId: String,
    },
    mounted: function(){
        this.$nextTick(function(){
            this.$http.get('http://localhost:63085/api/Arrow/' + this.arrowId).
                then(response => {
                    return response.json();
                })
                .then(data =>{
                    this.arrow = data;
                });
            }),
            this.$http.get('http://localhost:63085/api/Images/getall/' + this.arrowId)
                .then(response =>{
                    return response.json();
                })
                .then(data => {
                    this.imageIdsForArrow.push(this.imageId)
                    for(let id in data){
                        this.imageIdsForArrow.push(data[id]);
                    }
                });
        },
        
    watch:{
            'dialog': function(){
                this.$emit('blurBackground', this.dialog)
            },
            'imgIndex': function(){
                this.mainImage = this.imageIdsForArrow[this.imgIndex]
            },
        },
    methods:{
        changeMainImage(index){
            this.imgIndex = index;
        },
        close(){
            this.dialog = false;
        },
        next(){
            this.imgIndex += 1;
            if(this.imgIndex >= this.imageIdsForArrow.length){
                this.imgIndex = 0;
            }
        },
        deleteImage(imageId){
            console.log(imageId)
        }
    },
    computed:{
        imgUrl(){
            const imgSource = 'http://localhost:63085/api/Images/' + this.imageIdsForArrow[this.imgIndex]
            return imgSource
        },
        isLoggedIn(){
            return this.$cookie.get('token') !== null ? true : false;
        }
    }
}
</script>

<style scoped>
    .popup{
        background-color: rgba(0, 0, 0, 0.6);
        display: block;
        overflow: hidden;
        height: 100vh;
    }
    
    .thumb{
        background-color: black;
    }
    .img-thumbs{
        width: 100px;
        height: 100px;
        object-fit: cover;
        float: none;
        cursor: pointer;
        margin-right: 20px;
        opacity: 0.6;
    }
    .img-thumbs--active{
        opacity: 1;
    }
    .image-container{
        width: 100%;
        overflow-x: auto;
        height: 100vh;
        display: inline-block;
    }
    .btn-fix:focus::before { 
        z-index: 15;
        opacity: 0 !important; 
    }
</style>
