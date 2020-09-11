<template>
    <v-container fluid>
        <v-row>
            <v-col cols="11" class="article-header">
                <p>{{article.title}}</p>
            </v-col>
            <v-col cols="1">
                <p>{{article.date}}</p>

            </v-col>
        </v-row>
        <v-row>
            <v-col cols="10" offset="1">
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
        created(){
            db.collection('blogs')
                .doc(this.id).get()
                .then(doc =>{
                    this.article = {
                        'title': doc.data().title,
                        'context': doc.data().context,
                        'date': doc.data().date
                    }
                })
        }
        
        
    }
</script>
<style scoped>
    .article-context{
        text-align: justify;
    }
    .article-header{
        text-align: center;
    }
</style>