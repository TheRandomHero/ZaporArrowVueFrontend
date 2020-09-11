<template>
    <v-container>
        <v-row v-for="article in articles" :key="article.id">
            <v-col cols="8" offset="2">
               <div>
                   <p>{{ article.title }}</p> <v-spacer></v-spacer> <p>{{ article.date }}</p>
               </div>
               <div>
                   {{article.context.slice(0,401) + "..."}}
               </div>
               <a @click.stop="$router.push({name:'viewArticle', params: {id: article.id}})">Read More..</a>
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
                db.collection('blogs').get()
                .then(snap =>{
                    snap.forEach(doc =>{
                        const data = {
                            'id':doc.id,
                            'title':doc.data().title,
                            'context':doc.data().context,
                            'date': doc.data().date
                        }
                        this.articles.push(data)
                    })
                })
            }
    }
</script>