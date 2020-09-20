<template>
    <v-container>
        <form @submit.prevent="uploadArticle">
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

            <v-row> 
                <v-col>
                    <input type="file" 
                            style="display: none" 
                            ref="fileInput" 
                            accept="image/*"
                            @change="onFileSelected">
                    <v-btn raised class="primary" @click="$refs.fileInput.click()" >Select file</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <select v-model="selectedCategory">
                        <option disabled value="">Válassz kategóriát</option>
                        <option v-for="(category,i) in categories" :key="i">{{category}}</option>
                    </select>
                </v-col>
            </v-row>

            <v-row >
                <v-col>
                    <img :src="imageUrl" height="350">
                </v-col>
            </v-row>
           <v-btn type="submit" class="primary">Feltöltés</v-btn>
        </form>
    </v-container>    
</template>
<script>
    import axios from 'axios'
    import firebase from './../../firebaseInit'
    const db = firebase.firestore();

    export default {
        data() {
            return {
                uploadPreset: 'mchzxehv',
                selectedFile: null,
                baseUrl: 'https://api.cloudinary.com/v1_1/dwqs04xan/upload/',
                categories:[
                    'Íjászat',
                    'Tábor',
                    'Esemémy',
                    'Oktató',
                    'Gondolatok',
                    'Munka'
                ],
                selectedCategory:'',
                title:'',
                context:'',
                imageUrl:'',
                date :  new Date().toISOString().slice(0, 10),

            }
        },
        methods:{
            uploadArticle(){
                this.onUploadImageForBlog()
                .then(() =>{
                    db.collection('blogs').
                    add({title: this.title, 
                        context:this.context,
                        imageUrl:this.imageUrl,
                        category:this.selectedCategory,
                        date: this.date}).
                    then(() =>{
                        console.log('uploaded')
                    }).
                    catch(err =>{
                        console.log(err)
                    })
                })
            },
            async onUploadImageForBlog(){
                const fd = new FormData()
                fd.append('file', this.selectedFile)
                fd.append('upload_preset', this.uploadPreset)
                fd.append('folder', 'Blog')
                    axios.post(this.baseUrl, fd,{
                    })
                    .then(res =>{
                        this.imageUrl = res.data.secure_url
                    })
                    .catch(err =>{
                        console.log(err)
                    })
            },
            onFileSelected(event){
            this.selectedFile = event.target.files[0]

            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result 
            })
            fileReader.readAsDataURL(this.selectedFile)
            }
        }
        
    }
</script>
<style scoped>

</style>