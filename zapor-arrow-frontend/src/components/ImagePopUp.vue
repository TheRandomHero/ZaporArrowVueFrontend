<template>
    <v-dialog v-model="dialog" fullscreen>
        <template v-slot:activator="{ on }">
                <v-card v-on="on" max-width="250" max-height="250" class="text-center" tag="button" >
                    <v-img :src="imgBaseUrl + profilPublicId + '.jpg' " 
                    width="100%" 
                    height="100%"></v-img>
                </v-card>
        </template>
        <v-container fluid fill-height @click="close" class="popup">

            <v-row align="center" justify="center">
                <v-col cols="8" >
                    <v-card flat class="main-image-card">
                        <v-row>
                            <v-fab-transition >
                                <v-btn v-if="isLoggedIn"
                                class="btn-fix"
                                absolute
                                top
                                right
                                fab
                                @click.stop="$router.push({name:'arrowPage', params: {id: arrowId}})">
                                    <v-icon>fas fa-edit</v-icon>
                                </v-btn>
                            </v-fab-transition>
                        </v-row>
                        <transition name="fade">
                        <v-img :src="imgUrl"
                            :key="imgUrl"
                            width="100%" 
                            height="100%" 
                            @click.stop="next"
                            class="main-image"
                         ></v-img>
                        </transition>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <v-card flat tile class="description-card">
                        <v-card-title>Description: </v-card-title>
                        <v-card-text v-if="arrow">{{ arrow.description }}</v-card-text>
                </v-card>
                </v-col>
            </v-row>
            <v-row  justify="center" align="end" class="thumb-container">
                <v-card v-for="(url, i) in imageUrls" :key="i"
                    flat class="img-thumbs"
                    :class="{'img-thumbs--active' : i === imgIndex}" >
                    <v-img :src="url"
                    alt="align-center"
                    @click.stop="changeMainImage(i)">
                    </v-img>
                </v-card>
            </v-row>
        </v-container>
    </v-dialog>
</template>

<script>
import { mapGetters} from 'vuex'
import  axios  from 'axios'


export default {
    data(){
        return{
            dialog:false,
            imgIndex:0,
            arrow:null,
            loader: true,
            mainImage:null,
            imageUrls:[],
            imgBaseUrl: 'https://res.cloudinary.com/dwqs04xan/image/upload/',
            jsonBaseUrl: `https://res.cloudinary.com/dwqs04xan/image/list/${this.imageTag}.json`

        }
    },
    props:{
        profilPublicId: String,
        imageTag: String,
    },

    mounted: function(){
        this.$nextTick(function(){
            axios.get(this.jsonBaseUrl)
            .then((res) =>{
                this.imageUrls = res.data.resources.map(p => {
                    return `${this.imgBaseUrl}${p.public_id}.${p.format}`
                })
            })
        })
        },

    watch:{
            'dialog': function(){
                this.$emit('blurBackground', this.dialog)
            },
            'imgIndex': function(){
                this.mainImage = this.imageUrls[this.imgIndex]
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
            if(this.imgIndex >= this.imageUrls.length){
                this.imgIndex = 0;
            }
        },
        deleteImage(imageId){
            console.log(imageId)
        },
    },
    computed:{
        ...mapGetters([
            'isLoggedIn'
        ]),
        imgUrl(){
            const imgSource = this.imageUrls[this.imgIndex]

            return imgSource
        }
    }
}
</script>

<style scoped>
    .popup{
        position: relative;
        background-color: rgba(0, 0, 0, 0.6);
        overflow: hidden;
        align-items: stretch;
    }


    .thumb-container{
        align-self: flex-end;
    }
    .thumb{
        background-color: black;
    }
    .img-thumbs{
        background-color: transparent;
        width: 12%;
        height: 100%;
        object-fit: cover;
        float: none;
        cursor: pointer;
        margin-right: 20px;
        opacity: 0.6;
    }
    .img-thumbs--active{
        opacity: 1;
    }
 
    .main-image-card{
        position: relative;
        background-color: transparent;
        margin-left: 20%;
        max-width: 70%;
    }
    .main-image-card img{
        position: absolute;
        
    }


    .btn-fix:focus::before {
        z-index: 15;
        opacity: 0 !important;
    }
    .description-card{
        position: fixed;
        background-color: transparent;
        color: white;
        font-weight: 500;
    }



    .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
    
    }
    .fade-enter {
        transition: opacity 1s;
        opacity: 0;
    } 
    .fade-leave-to{
        transition: opacity 1s;
        opacity: 0;
        position: absolute;
    }
</style>
