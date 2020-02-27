<template>
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on }">
            <v-row>
                <v-col>
                    <v-btn flat v-on="on">
                        <v-card max-width="300" max-height="300" class="text-center">
                            <v-img :src="'http://localhost:63085/api/Images/' + arrowId" class="align-center"></v-img>
                        </v-card>
                    </v-btn>
                </v-col>
            </v-row>
        </template>

    </v-dialog>
</template> 

<script>
export default {
    data(){
        return{
            dialog:false,
        }
    },
    props:['arrowId']
}
</script>

<style scoped>

</style>