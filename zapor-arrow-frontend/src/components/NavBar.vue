<template>
    <v-container fluid class="header-container">
    <h3 class="nav-title">{{headerTitle}}</h3>
       <nav class="my-nav">
           <ul class="my-nav-nav hidden-sm-and-down">
               <li v-for="(item,i) in filteredNavItems" :key="i"
                    class="my-nav-item"
               ><a @click="$router.push(item.route)">{{item.text}}</a></li>
               <li v-if="user.loggedIn"
                    class="my-nav-item"><a @click="signOut">Kijelentkezés</a>
                </li>
           </ul>
       </nav>
        <v-app-bar absolute flat color="transparent d-md-none">
            <v-app-bar-nav-icon class="col-sm-2 col-xs-1" @click="drawer = !drawer">
                <v-img class="logo-btn" src="./../assets/appolonlogo.png"></v-img>
            </v-app-bar-nav-icon>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app temporary>
            <v-list>
                <v-list-item v-for="(item,i) in navItems" :key="i" router :to="item.route">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="user.loggedIn" router to="/upload">
                    <v-list-item-icon>
                        <v-icon>fas fa-file-upload</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Upload</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        
    </v-container>
</template>

<script>

import { mapGetters } from 'vuex'

import firebase from 'firebase';
    export default {
        data(){ 
            return {
                drawer: false,
                navItems: [
                    {icon: 'fas fa-chess-rook', text: 'Főoldal', route:'/'},
                    {icon: 'far fa-image', text: 'Galéria', route:'/gallery'},
                    {icon: 'fas fa-newspaper', text: 'Blogom', route:'/blog'},
                    {icon: 'far fa-id-badge', text: 'Rólam', route:'/about-me'}
                ],
            }
        },
        props: [
            'headerTitle'
        ],
        computed:{
            ...mapGetters({
            user: 'user'
            }),
            filteredNavItems(){
                return this.navItems.filter((item) =>{
                    return !item.route.match(this.$route.name)
                })
            }
        },
        methods:{
            signOut(){
            firebase
            .auth()
            .signOut()
            .then(() =>{
                this.$router.replace({
                    name: "home"
                });
            });
        }
        }
        

    }
</script>

<style scoped>

    .header-container{
        padding: 0;
    }

    .nav-title{
        position: absolute;
        left: 30%;
        top: 8vh;
        text-transform: uppercase;
        font-family: 'twang';
        font-size: 5rem;
    }
    .my-nav{
        background-image: url('./../assets/gallery-bg.jpg');
        height: 200px;
    }
    .my-nav-nav{
        position: absolute;
        display: flex;
        top: 20vh;
        right: 0;
        margin: 0;
        padding: 0;
    }

    .my-nav-item{
        line-height: normal;
        list-style:none;
        display: inline-block;
        
    }
    .my-nav-item a{
        position: relative;
        display: block;
        padding: 10px 15px;
        text-align: center;
        text-transform: uppercase;
        text-decoration: none;
        font-size: 2rem;
        font-family: 'twang';
        color: thistle;
    }

    .v-btn.v-size--default{
        font-size: 3rem;
        font-weight: 600;
        color: antiquewhite;
    }
    .v-btn:before{
        opacity: 0 !important;
    }

    .logo-btn{
        background-size: 100%;
        width: 1em;
    }

    @media screen and (max-width: 430px){
        .nav-title{
            font-size: 2rem;
        }
        .my-nav{
            background-size: contain;

        }
        .nav-title{
            color: thistle;
        }
    }
    @media screen and (max-width: 768px) {
        .logo-btn{
            top: 25px;
        }       
    }
    @media screen and (min-width: 1400px) {
        .my-nav-nav{
            top: 11vh;
        }
    }
</style>