<template>
    <v-container fluid fill-height style="padding:0">
        <app-nav-bar></app-nav-bar>
        <v-row>
            <v-col  class="article-header">
                <p>{{article.title}}</p>
                <v-btn v-if="user.loggedIn" @click="$router.push({name:'editBlogPost', params:{id: id}})">Szerkesztés</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col lg="8" offset-lg="2" sm="12">
                <v-img :src="article.imageUrl"></v-img>
            </v-col>
        </v-row>
        <v-row >
            <v-col cols="8" offset="2" class="article-context" >
                <div>{{article.context}}</div>
                <p>{{article.date}}</p>
            </v-col>
        </v-row>
    </v-container>    
</template>


<script>

    import NavBar from './../../components/NavBar.vue'
    import firebase from './../../firebaseInit'
    const db = firebase.firestore();
    import { mapGetters } from 'vuex'

    export default {
        props:['id'],
        data(){
            return{
                article:{}
            }
        },
        components:{
            appNavBar:NavBar
        },
        mounted(){
            db.collection('blogs')
                .doc(this.id).get()
                .then(doc =>{
                    this.article = {
                        'title': doc.data().title,
                        'context': doc.data().context,
                        'date': doc.data().date,
                        'imageUrl': doc.data().imageUrl
                    }
                })
        },
        computed:{
            ...mapGetters({
                user: 'user'
                }),
        }
        
        
    }
</script>
<style scoped>
    .article-context{
        text-align: justify;
        font-family: 'bookAntiqua';
        font-size: 15px ;
        font-weight: 600;
        white-space: break-spaces;
    }
    .article-header{
        text-align: center;
        font-family: 'twang';
        font-size: 5rem;
    }
    
</style>