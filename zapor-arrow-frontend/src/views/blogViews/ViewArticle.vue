<template>
    <v-container>
        <v-row>
            <v-col>
                <div>
                    <p>{{article.title}}</p>
                    <p>{{article.date}}</p>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div>{{article.context}}</div>
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
                        'date': doc.data().date.toDate().toString().slice(3,15)
                    }
                })
        }
        
        
    }
</script>
<style scoped>

</style>