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
        <v-container fluid fill-height class="popup">
            <v-row align-content="start" justify="center">
                <v-col cols="6" offset="3">
                    <img :src="'http://localhost:63085/api/Images/' + mainImage "  alt="align-center" width="60%" height="100%">
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
                        <v-card v-for="(id, i) in imageIdsForArrow" :key="i" max-height="80%"  max-width="20%" class="mx-2">
                            <img :src="'http://localhost:63085/api/Images/' + id" alt="align-center" width="100%" height="100%"  @click="changeMainImage(i)">
                        </v-card>
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
            imageIdsForArrow:[]
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
            this.mainImage = this.imageIdsForArrow[this.imgIndex]
        },
        
    watch:{
            'dialog': function(){
                this.$emit('blurBackground', this.dialog)
            },
            'imgIndex': function(){
                this.mainImage = this.imageIdsForArrow[this.imgIndex]
            }
        },
    methods:{
        changeMainImage(index){
            this.imgIndex = index;
        }
    }
}
</script>

<style scoped>
    .popup{
        background-color: black;
        background-color: rgba(0, 0, 0, 0.6);
        overflow: hidden;
    }

</style>