<template>
    <v-container>
        <v-row v-for="article in articles" :key="article.id">
            <v-col cols="8" offset="2">
                <div class="article">
                    <div class="article-header">
                        <p class="article-date">{{ article.date }}</p>
                        <p class="article-title">{{ article.title }}</p> 
                    </div>
                    <v-img :src="article.imageUrl"></v-img>
                    <div class="article-context">
                        {{article.context.slice(0,401) + "..."}}
                        <a @click.stop="$router.push({name:'viewBlogPost', params: {id: article.id}})">Read More..</a>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import firebase from './../../firebaseInit'
    const db = firebase.firestore();
        
    export default {
        data(){
            return{
                articles:[],
            }
        },
        created(){
                db.collection('blogs').orderBy('date', 'desc').get()
                .then(snap =>{
                    snap.forEach(doc =>{
                        const data = {
                            'id':doc.id,
                            'title':doc.data().title,
                            'context':doc.data().context,
                            'date': doc.data().date,
                            'imageUrl': doc.data().imageUrl
                        }
                        this.articles.push(data)
                    })
                })
            }
    }
</script>

<style scoped>
    .article{
        border: solid 3px black;
        border-radius: 25px;
        padding: 10px;
    }
    .article-header{
        display: inline;
        font-family: 'Just Another Hand', cursive;
    }

    .article-title{
        text-align: center !important;
        font-size: 3em;
    }
    
    .article-date{
        text-align: end;
        margin: 0px;
    }

    .article-context{
        font-family: 'bookAntiqua';
        margin: 5px;
        padding:20px;
        text-align: justify;
    }
</style>