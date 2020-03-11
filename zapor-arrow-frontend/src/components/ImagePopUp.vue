<template>
    <v-dialog v-model="dialog" max-width="1000px">
        <template v-slot:activator="{ on }">
            <v-row>
                <v-col>
                    <v-btn text v-on="on" min-width="250" min-height="250">
                        <v-card max-width="250" max-height="250" class="text-center">
<<<<<<< Updated upstream
                            <v-img :src="'http://localhost:63085/api/Images/' + arrowId" class="align-center"></v-img>
=======
                            <v-img :src="'http://localhost:63085/api/Images/' + imageId"  class="align-center"></v-img>
>>>>>>> Stashed changes
                        </v-card>
                    </v-btn>
                </v-col>
            </v-row>
        </template>
        <v-row>
            <v-col>
<<<<<<< Updated upstream
                <v-card>
                    <img :src="'http://localhost:63085/api/Images/' + arrowId "  alt="align-center" width="100%" height="100%">
                </v-card>
=======
                <v-row>
                    <v-card>
                        <img :src="'http://localhost:63085/api/Images/' + imageId "  alt="align-center" width="100%" height="100%">
                    </v-card>
                </v-row>
                <v-row>
                    <v-col v-for="id in restImageIdForArrow" :key="id">
                        <img :src="'http://localhost:63085/api/Images/' + id" alt="align-center" width="40%" height="100%" >
                    </v-col>
                </v-row>
>>>>>>> Stashed changes
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title>Length: </v-card-title>
                    <v-card-text v-if="arrow">{{ arrow.length }}</v-card-text>
                </v-card>
                <v-card>
                    <v-card-title>Description: </v-card-title>
                    <v-card-text v-if="arrow">{{ arrow.description }}</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-dialog>
</template> 

<script>
export default {
    data(){
        return{
            dialog:false,
<<<<<<< Updated upstream
            arrow:null
=======
            arrow:null,
            loader: true,
            restImageIdForArrow:[]
>>>>>>> Stashed changes
        }
    },
    props:['arrowId'],
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