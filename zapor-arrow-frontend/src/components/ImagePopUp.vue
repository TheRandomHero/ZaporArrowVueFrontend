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
                    <img :src="'http://localhost:63085/api/Images/' + imageId "  alt="align-center" width="60%" height="100%">
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
                        <v-card v-for="id in imageIdsForArrow" :key="id" max-height="80%"  max-width="20%" class="mx-2">
                            <img :src="'http://localhost:63085/api/Images/' + id" alt="align-center" width="100%" height="100%" >
                        </v-card>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
            <!-- <v-row>
                <v-col>
                    <v-row>
                        <img :src="'http://localhost:63085/api/Images/' + imageId "  alt="align-center" width="60%" height="100%">
                    </v-row>
                    <v-row>
                        <v-col v-for="id in restImageIdForArrow" :key="id">
                            <img :src="'http://localhost:63085/api/Images/' + id" alt="align-center" width="40%" height="100%" >
                        </v-col>
                    </v-row>
                </v-col>
                <v-col>
                    <v-card transparent>
                        <v-card-title>Description: </v-card-title>
                        <v-card-text v-if="arrow">{{ arrow.description }}</v-card-text>
                    </v-card>
                </v-col>
            </v-row> -->
    </v-dialog>
</template> 

<script>
export default {
    data(){
        return{
            dialog:false,
            arrow:null,
            loader: true,
            imageIdsForArrow:[]
        }
    },
    props:['arrowId','imageId'],
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