<template>
    <nav>
        <v-toolbar absolute flat color="transparent hidden-md-and-down" width="100%">
            <v-spacer />
            <v-toolbar-items v-for="(item,i) in navItems" :key="i">
                <v-btn text router :to="item.route" class="off-active nav-items">{{ item.text }} </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-app-bar absolute flat color="transparent d-lg-none">
            <v-btn color="black--text"  @click="drawer = !drawer" icon class="pl-5" ><img width="100" height="100" src="../assets/appolonlogo.png"></v-btn>
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
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
    export default {
        data(){ 
            return {
                drawer: false,
                navItems: [
                    {icon: 'fas fa-chess-rook', text: 'Home', route:'/'},
                    {icon: 'far fa-image', text: 'Gallery', route:'/gallery'},
                    {icon: 'far fa-id-badge', text: 'About', route:'/about'}
                ]
            }
        }   
    }
</script>

<style scoped>
    .v-btn.v-size--default{
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: 2rem;
        font-weight: 600;
        color: antiquewhite;
    }
    .v-btn:before{
        opacity: 0 !important;
    }
</style>