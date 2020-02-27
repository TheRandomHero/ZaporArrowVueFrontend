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