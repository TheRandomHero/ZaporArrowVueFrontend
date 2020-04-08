<template>
    <v-container fluid class="home-container">
        <v-row>
            <v-col cols="12" class="main-picture-container">
                <v-img src="./../assets/mainbg.png" max-height="722" ></v-img>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="col-xs-12 col-md-8 offset-md-2 col-lg-10 offset-lg-1 pt-5">
                <div class="sub-picture-container">
                    <v-card flat :to="'gallery'" class="card-picture">
                        <v-img src="./../assets/background.jpg" width="100%" max-height="400" >
                            <div class="card-text">Gallery</div>
                        </v-img>
                    </v-card>
                    <v-card flat :to="'gallery'"  max-width="48%" class="card-picture">
                        <v-img src="./../assets/equipment.jpg" width="100%" max-height="400">
                            <div class="card-text">Good To Know</div>
                        </v-img>
                    </v-card>
                    <v-card flat :to="'gallery'"  max-width="48%" class="card-picture">
                        <v-img src="./../assets/about.jpg" width="100%" max-height="400">
                            <div class="card-text">About</div>
                        </v-img>
                    </v-card>
                    <v-card flat :to="'about'">

                    </v-card>

                </div>
            </v-col>
        </v-row>
        <v-row align-center>
        
        </v-row>
        
    </v-container>
</template>

<script>
    export default {
        data(){
            return{
            } 
        },
    }
</script>

<style scoped>
    .main-picture-container{
        padding: 0;

    }
    .home-container{
        padding-top: 0px;
    }
    .sub-picture-container{
        background-color: transparent;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

    }
    .card-picture{
        background-color: transparent;
        position: relative;
        padding-top: 10px;
        margin:10px;

    }   
    .card-text{
        position: absolute;
        bottom:50%;
        left:43%;
        font-size: 40px;
        font-weight: bolder;
        color: white;
    }
</style>