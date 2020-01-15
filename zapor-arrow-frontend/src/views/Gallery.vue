<template>
    <v-container fluid>
        <v-layout class="gallery" justify="center" align="center">
            <v-col class="col-lg-6 offset-lg-3" >
                <p class="display-3 font-weight-bold main-title">Gallery</p>
            </v-col>
        </v-layout>
        <v-row >
            <v-col class="col-lg-8 offset-lg-2">
                <v-row class="mx-5">
                    <v-col v-for="arrow in arrows" :key="arrow.arrowId" class="col-lg-4">
                        <v-card max-width="300" max-height="300" class="text-center">
                            <v-img :src="arrow.imgSrc" class="align-center"></v-img>
                        </v-card>
                    </v-col>
                </v-row>
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