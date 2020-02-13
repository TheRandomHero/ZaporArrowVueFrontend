<template>
    <v-container>
        <v-row >
            <v-col cols="6">
                <v-card>
                    <img :src="'http://localhost:63085/api/Images/' + $route.params.id "  alt="align-center" width="100%" height="100%">
                </v-card>

            </v-col>
            <v-col cols="6">
                <v-card>
                    <p>Length:</p>
                    <p v-if="arrow">{{arrow.length}}</p>
                </v-card>
                <v-card>
                    <p v-if="arrow">{{arrow.description}}</p>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        props: ['id'],

        data() {
            return {
                arrow:null,
            }
        },
        created(){
            this.$http.get('http://localhost:63085/api/Images/arrow/' + this.id)
            .then(response => {
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