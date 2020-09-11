<template>
    <v-container>
           <v-text-field
           v-model="title"
           label="Cím"
           required>

           </v-text-field>
           <v-textarea
           v-model="context"
           label="Tartalom"
           required>

           </v-textarea>

           <v-btn @click="uploadArticle" class="primary">Feltöltés</v-btn>
    </v-container>    
</template>
<script>
    import firebase from './../../firebaseInit'
    const db = firebase.firestore();

    export default {
        data() {
            return {
                title:'',
                context:'',
                date :  new Date().toISOString().slice(0, 10)
            }
        },
        methods:{
            uploadArticle(){
                db.collection('blogs').
                add({title: this.title, 
                    context:this.context, 
                    date: this.date}).
                then(() =>{
                    this.$router.push({name:'articles'})
                }).
                catch(err =>{
                    console.log(err)
                })
            }
        }
        
    }
</script>
<style scoped>

</style>