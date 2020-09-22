<template>
    <v-footer dark padless min-width="100%">
        <v-card tile color="transparent" class="text-center" width="100%">
            <v-card-text >
                <v-btn v-for="icon in icons" :key="icon.name"
                        class="mx-4 white--text"
                        icon
                        :href="icon.route">
                        <v-icon flat >{{ icon.icon }}</v-icon>    
                </v-btn>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>{{ new Date().getFullYear() }} — <strong>Zápor Arrow</strong> </v-card-text>
        </v-card>   
    </v-footer>
</template>
<script>
    export default {
        data() {
            return {
                icons: [
                    {name:'home', icon:'fas fa-chess-rook', route:'/'},
                    {name:'youtube', icon:'fab fa-youtube-square', route:'https://www.youtube.com/channel/UCETkEaD396q_DeMZX41LwWw'},
                    {name:'facebook', icon:'fab fa-facebook-square', route:'https://www.facebook.com/zaporarrow/'},
                    {name:'email', icon:'fas fa-envelope-square'},
                    {name:'key', icon:'fas fa-key', route:'/login'}
                ]
            }
        }
    }
</script>
<style scoped>

</style>