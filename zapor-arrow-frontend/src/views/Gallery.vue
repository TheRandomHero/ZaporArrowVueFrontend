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
    data() {
            return {
                arrows:[
                    {id:'1', imgSrc: require('../../../ZaporArrow/wwwroot/images/084f2d21-584d-4bb5-bc57-1a6f3b276fe1_znb1.jpg'), length: '#30', description:'extra donga 7mm, 22-22,2gramm 30 font!'},
                    {id:'2', imgSrc:require('../../../ZaporArrow/wwwroot/images/1f5df3e2-400f-499f-9850-19b4116f37b4_szpn1.jpg'), length: '#29', description:'extra donga 7mm, 22-22,2gramm 30 font!'},
                    {id:'3', imgSrc:require('../../../ZaporArrow/wwwroot/images/2d223d00-c18a-4158-ac78-803117085e9b_bfn.jpg'), length: '#50', description:'50+#, 31-31,5g dongás exclusive traditional 5,5" os natúr tollal!'},
                    {id:'4', imgSrc:require('../../../ZaporArrow/wwwroot/images/svb1.jpg'), length: '#33', description:'extra donga 7mm, 22-22,2gramm 30 font!'},
                    {id:'5', imgSrc:require('../../../ZaporArrow/wwwroot/images/b647c749-f46b-4c79-9129-b35a60277ae9_bfb1.jpg'), length: '#42', description:'extra donga 7mm, 22-22,2gramm 30 font!'},
                    {id:'6', imgSrc:require('../../../ZaporArrow/wwwroot/images/7b2cb54c-0e37-4a4c-a61c-f6efb2eef96f_skn1.jpg'), length: '#22', description:'50+#, 31-31,5g dongás exclusive traditional 5,5" os natúr tollal'},
                    {id:'7', imgSrc:require('../../../ZaporArrow/wwwroot/images/bfb1.jpg'), length: '#26', description:'extra donga 7mm, 22-22,2gramm 30 font!'},
                ]
            }
        }
}
</script>
<style scoped>
    .gallery {
            position: relative;
            background-image: url('../assets/mainbg.png');
            width: 100%;
            height: auto;
            padding-top: 20%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .main-title{
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sansp
        }
        .container{
        padding: 0px
    }
</style>