<template>
    <v-container fluid>
        <v-row>
            <v-col cols="10" class="article-header">
                <p>{{article.title}}</p>
                <v-btn @click="$router.push({name:'editBlogPost', params:{id: id}})">Edit</v-btn>
            </v-col>
            <v-col cols="2">
                <p>{{article.date}}</p>

            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-img :src="article.imageUrl"></v-img>
            </v-col>
        </v-row>
        <v-row>
            <v-col >
                <div class="article-context">{{article.context}}</div>
            </v-col>
        </v-row>
    </v-container>    
</template>


<script>

    import firebase from './../../firebaseInit'
    const db = firebase.firestore();

    export default {
        props:['id'],
        data(){
            return{
                article:{}
            }
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
        }
        
        
    }
</script>
<style scoped>
    .article-context{
        text-align: justify;
        font-family: 'forte';
    }
    .article-header{
        text-align: center;
        font-family: 'twang';
    }
</style>