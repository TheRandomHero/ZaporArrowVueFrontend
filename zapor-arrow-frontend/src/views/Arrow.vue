<template>
    <v-container>
        <v-row>
            <v-col cols="6">
                <v-card>
                    <img :src="'https://localhost:44310/api/Images?arrowId=' + $route.params.id " alt="align-center">
                </v-card>
            </v-col>
            <v-col>

            </v-col>

        </v-row>
    </v-container>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>