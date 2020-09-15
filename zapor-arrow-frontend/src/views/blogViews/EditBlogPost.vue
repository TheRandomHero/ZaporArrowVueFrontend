<template>
    <v-container fluid>
        <form @submit.prevent="updateArticle">
            <v-row>
                <v-col>
                    <v-text-field
                    v-model="title"> {{ title }}
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-textarea
                    auto-grow
                    v-model="context">
                    {{ context }}
                    </v-textarea>
                </v-col>
            </v-row>
            <v-btn type="submit" class="primary">Edit</v-btn>
            <v-btn @click="deleteArticle" class="error">Delete</v-btn>
        </form>
    </v-container>    
</template>
<script>
    import firebase from './../../firebaseInit'
    const db = firebase.firestore();
    
    export default {
        props:['id'],

        data(){
            return {
                title:null,
                context:null,
            }
        },
        beforeRouteEnter (to, from, next){
            db.collection('blogs').doc(to.params.id).get()
            .then(doc =>{
                next(vm =>{
                    vm.title = doc.data().title,
                    vm.context = doc.data().context
                })
            })

        },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        db.collection('blogs').doc(this.$route.params.id).get()
        .then(doc =>{
                this.title = doc.data().title,
                this.context = doc.data().context
            })
      },
      updateArticle(){
          db.collection('blogs').doc(this.$route.params.id).get()
          .then(doc => {
              doc.ref.update({
                  context: this.context,
                  title: this.title
              })
              .then(() =>{
                  this.$router.push({name:'viewBlogPost', params:{id: this.id}})
              })
          })
      },
      deleteArticle(){
          db.collection('blogs').doc(this.$route.params.id).get()
          .then(doc =>{
              doc.ref.delete();
              this.$router.push('/')
          })
      },
        
    }
}
</script>

<style scoped>

</style>