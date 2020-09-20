<template>
    <v-container fill-height fluid class="home-container" tag="div">
        <div class="main-title-container">
            <p style="unicode-bidi:bidi-override">{{ title }}</p>
        </div>
        <v-row>
            <v-carousel 
                        cycle
                        show-arrows-on-hover
                        hide-delimiters
                        prev-icon="fas fa-chevron-left"
                        next-icon="fas fa-chevron-right" 
                        height="200">
                <v-carousel-item
                    v-for="(slide, i) in menuBar"
                    :key="i"
                    elevation="0">
                        <v-btn text :to="slide.route" height="150" 
                        depressed
                        class="item-button">
                            <div>
                                <p class="menu-item">{{ slide.name }}</p>
                                <v-img src="./../assets/arrows.png"  max-height="50"></v-img>
                            </div>
                        </v-btn>
                </v-carousel-item>
            </v-carousel>
        </v-row>
        <div class="sub-title-container">
            <p>ZaporArrow</p>
        </div>
    </v-container>
</template>

<script>

    export default {
        data(){
            return{
                title:"ZAPOR",
                menuBar:[
                    {
                        name:"Galéria",
                        route:"/gallery"
                    },
                    {
                        name:"Rólam",
                        route:"/aboutMe"
                    },
                    {
                        name:"Cikkek",
                        route:"/blog"
                    }
                ]
            } 
        },
        
    }
</script>

<style scoped>

    
    .home-container{
        background-image: url('./../assets/bg.jpg');
        background-size: cover;
        display: grid !important;
        text-align: center;
        
    }
    .main-title-container{
        font-family: 'rovas';
        direction: rtl;
        font-size: 15em;
        float:right;
        margin: auto;
        margin-top:-25px;
    }
    

    .sub-title-container{
        font-size: 5em;
        font-family: 'twang';
        margin: auto;
    }

    .menu-item{
        unicode-bidi:bidi-override !important;
        font-size: 50px;
        font-family: 'rovas';
        direction: rtl;
    }

    .item-button:hover .menu-item{
        direction: ltr;
        unicode-bidi: normal;
        font-family: 'Courier New', Courier, monospace;
        font-weight: bolder;
    }
    .v-btn::before{
        color: transparent;
    }
    .v-window__next .v-btn::before{
        color: transparent;
    }
</style>