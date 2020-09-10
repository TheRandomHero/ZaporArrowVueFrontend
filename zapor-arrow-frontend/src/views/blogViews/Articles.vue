<template>
    <div>
        <div v-for="article in articles" :key="article.id">
            {{ article.title }}
            <p>{{article.context}}</p>
        </div>

    </div>
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
                            'date': doc.data().date.toDate()
                        }
                        this.articles.push(data)
                    })
                })
                console.log(this.articles)
            }
    }
</script>