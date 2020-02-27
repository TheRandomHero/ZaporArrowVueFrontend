<template>
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on }">
            <v-row>
                <v-col>
                    <v-btn text v-on="on" min-width="250" min-height="250">
                        <v-card max-width="250" max-height="250" class="text-center">
                            <v-img :src="'http://localhost:63085/api/Images/' + arrowId" class="align-center"></v-img>
                        </v-card>
                    </v-btn>
                </v-col>
            </v-row>
        </template>
        <v-row>
            <v-col>
                <v-card>
                    <img :src="'http://localhost:63085/api/Images/' + arrowId "  alt="align-center" width="100%" height="100%">
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
            arrow:null
        }
    },
    props:['arrowId'],
    mounted: function(){
        this.$nextTick(this.$http.get('http://localhost:63085/api/Images/arrow/' + this.id)).
        then(response => {
                return response.json();
            })
            .then(data =>{
                this.arrow = data;
            });
    }
}
</script>

<style scoped>

</style>