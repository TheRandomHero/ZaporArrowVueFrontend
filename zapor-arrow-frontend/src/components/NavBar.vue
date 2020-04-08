<template>
    <v-container fluid>

        <v-img :src="bg">

        <v-toolbar absolute flat color="transparent"  width="100%">
            <v-spacer />
            <v-toolbar-items v-for="(item,i) in navItems" :key="i" class="hidden-md-and-down" >
                <v-btn text router :to="item.route" class="off-active nav-items ">{{ item.text }} </v-btn>
            </v-toolbar-items>
            <v-toolbar-items v-if="isLoggedIn" class="hidden-md-and-down">
                <v-btn text router to="/upload" class="off-active nav-items">Upload</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-app-bar absolute flat color="transparent d-lg-none">
            <v-app-bar-nav-icon class="col-sm-2 col-xs-1" @click="drawer = !drawer">
                <v-img class="logo-btn" src="./../assets/appolonlogo.png"></v-img>
            </v-app-bar-nav-icon>
        </v-app-bar>
        
        </v-img>
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
                <v-list-item v-if="isLoggedIn" router to="/upload">
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
    export default {
        data(){ 
            return {
                drawer: false,
                navItems: [
                    {icon: 'fas fa-chess-rook', text: 'Home', route:'/'},
                    {icon: 'far fa-image', text: 'Gallery', route:'/gallery'},
                    {icon: 'far fa-id-badge', text: 'About Me', route:'/aboutMe'}
                ],
                image : '',
            }
        },
        props: {
            bg: String
        },
        computed:{
            isLoggedIn(){
                return this.$cookies.isKey('token');
            }
        }

    }
</script>

<style scoped>

    .v-btn.v-size--default{
        font-family: 'Web_OldHungarian';
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
</style>