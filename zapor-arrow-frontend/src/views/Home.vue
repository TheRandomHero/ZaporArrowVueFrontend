<template>
    <v-container fluid>
        <v-row class="header" row>
        </v-row>
        <v-row>
            <v-col class="col-xs-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 display-1" wrap>
                
                    <p>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."     
                    </p>
                    <p>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."     
                    </p>
              
            </v-col>
        </v-row>
        <v-row align-center>
            <v-spacer />
            <v-col class="col-lg-3">
                <v-card flat color="transparent ">
                    <img src="@/assets/thumb.jpg" width="100%" />
                </v-card>
                <v-card flat color="transparent">
                    <div class="text-center">
                        <v-icon size="50">far fa-heart</v-icon>
                    </div>
                    <v-card-title class="layout text-center">A vesszők egyediek, akár csak a íjak</v-card-title>
                    <v-card-text class="text-center px-5">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </v-card-text>
                </v-card>
            </v-col>

            <v-spacer />

            <v-col class=" col-lg-3 ">
                <v-card flat color="transparent">
                    <img src="@/assets/thumb.jpg" width="100%" />
                </v-card>
                <v-card flat color="transparent">
                    <div class="text-center">
                        <v-icon size="50">far fa-heart</v-icon>
                    </div>
                    <v-card-title class="text-center">A vesszők egyediek, akár csak a íjak</v-card-title>
                    <v-card-text class="text-center px-5">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </v-card-text>
                </v-card>
            </v-col>
            <v-spacer />
            <v-col  class="col-lg-3">
                <v-card flat color="transparent">
                    <img src="@/assets/thumb.jpg" width="100%" />

                </v-card>
                <v-card flat color="transparent">
                    <div class="text-center">
                        <v-icon size="50">far fa-heart</v-icon>
                    </div>
                    <v-card-title class="text-center">A vesszők egyediek, akár csak a íjak</v-card-title>
                    <v-card-text class="text-center px-5">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </v-card-text>
                </v-card>
            </v-col>   
            <v-spacer />    
        </v-row>
        
    </v-container>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .header {
        position: relative;
        background-image: url('../assets/mainbg.png');
        width: 100%;
        height: auto;
        padding-top: 62.5%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .row{
        margin-left: 0px;
        margin-right: 0px;
    }
    .container{
        padding: 0px
    }
    .v-card__title {
        word-break: normal;
    }
</style>