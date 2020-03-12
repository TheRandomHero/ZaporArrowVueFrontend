<template>
    <v-dialog v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-row>
                <v-col>
                    <v-btn text v-on="on" min-width="250" min-height="250">
                        <v-card max-width="250" max-height="250" class="text-center">
                            <v-img :src="'http://localhost:63085/api/Images/' + imageId" class="align-center" width="100%" height="100%"></v-img>
                        </v-card>
                    </v-btn>
                </v-col>
            </v-row>
        </template>
            <v-row align-content="start">
                <v-col cols="6" offset="3">
                    <img :src="'http://localhost:63085/api/Images/' + imageId "  alt="align-center" width="60%" height="100%">
                </v-col>
            </v-row>
            <v-row>
                <v-card >
                    <v-card-title>Description: </v-card-title>
                    <v-card-text v-if="arrow">{{ arrow.description }}</v-card-text>
                </v-card>
            </v-row>
            <v-row>
                <v-col cols="6" offset="3">
                    <v-col v-for="id in restImageIdForArrow" :key="id" >
                        <img :src="'http://localhost:63085/api/Images/' + id" alt="align-center" width="40%" height="100%" >
                    </v-col>
                </v-col>
            </v-row>
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
            restImageIdForArrow:[]
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
                    for(let id in data){
                        this.restImageIdForArrow.push(data[id]);
                    }
                });
        },
       
}
</script>

<style scoped>

</style>