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
        <v-container fluid fill-height @click="close" class="popup">
            
            <v-row align-content="start" justify="center">
                <v-col cols="6" offset="3">
                    <v-img :src="imgUrl"  alt="align-center" width="60%" height="100%" @click.stop="next" ></v-img>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-card flat tile >
                    <v-card-title>Description: </v-card-title>
                    <v-card-text v-if="arrow">{{ arrow.description }}</v-card-text>
                </v-card>
            </v-row>
            <v-row>
                <v-col cols="8" offset="2">
                    <v-row justify="center">
                        <v-col v-for="(id, i) in imageIdsForArrow" :key="i" cols="4">
                            <v-btn v-if="isLoggedIn"
                                color="red"
                                class="btn-fix"
                                fab absolute
                                @click.stop="deleteImage(id)">
                                    <v-icon >fas fa-trash-alt</v-icon>
                                </v-btn>
                            <v-card flat style="background-color:transparent"> 
                                <v-img :src="'http://localhost:63085/api/Images/' + id"
                                class="img-thumbs mt-6 ml-6"
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
            this.$http.get('http://localhost:63085/api/Images/arrow/' + this.arrowId).
                then(response => {
                    return response.json();
                })
                .then(data =>{
                    this.arrow = data;
                });
            }),
            this.$http.get('http://localhost:63085/api/Images/image/' + this.arrowId)
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
        overflow: hidden;
    }
    
    .thumb{
        background-color: black;
    }
    .img-thumbs{
        display: inline-block;
        float: none;
        cursor: pointer;
        object-fit: cover;
        opacity: 0.6;
    }
    .img-thumbs--active{
        display: inline-block;
        float: none;
        opacity: 1;
    }
    .btn-fix:focus::before { 
        z-index: 15;
        opacity: 0 !important; 
        }
</style>