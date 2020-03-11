<template>
    <v-dialog v-model="dialog" max-width="1000px">
        <template v-slot:activator="{ on }">
            <v-row>
                <v-col>
                    <v-btn text v-on="on" :loading="loader" min-width="250" min-height="250" >
                        <v-card max-width="250" max-height="250" class="text-center">
                            <v-img :src="'http://localhost:63085/api/Images/' + imageId" aspect-ratio="1" class="align-center"></v-img>
                        </v-card>
                    </v-btn>
                </v-col>
            </v-row>
        </template>
        <v-row>
            <v-col>
                <v-card>
                    <img :src="'http://localhost:63085/api/Images/' + imageId "  alt="align-center" width="100%" height="100%">
                </v-card>
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
            arrow:null,
            loader: true
        }
    },
    props:['imageId', 'arrowId'],
    mounted: function(){
        this.$nextTick(function(){
            this.$http.get('http://localhost:63085/api/Images/arrow/' + this.arrowId).
                then(response => {
                    return response.json();
                })
                .then(data =>{
                    this.arrow = data;
                    this.loader = false;
                });
            })
        }
}
</script>

<style scoped>

</style>