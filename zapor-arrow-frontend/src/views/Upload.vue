<template>
    <v-container fluid>
        <app-nav-bar />
        <v-row>
            <v-col class="col-4 offset-4">
            <v-form>
                <v-text-field
                v-model="tags"
                label="Tags"
                required
                ></v-text-field>
                <v-text-field
                v-model="folder"
                label="Mappa"
                required
                ></v-text-field>

                <v-row> 
                    <v-col>
                        <input type="file" 
                                style="display: none" 
                                ref="fileInput" 
                                accept="image/*"
                                @change="onFileSelected">
                        <v-btn raised class="primary" @click="$refs.fileInput.click()" >Select file</v-btn>
                    </v-col>
                    <v-col>
                        <v-btn raised class="primary" @click="onUpload" :disabled="isSelectedFileEmpty">Upload</v-btn>
                    </v-col>
                </v-row>

                <v-row >
                    <v-col>
                        <img :src="imageUrl" height="350">
                    </v-col>
                </v-row>

            </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import NavBar from './../components/NavBar';
import axios from 'axios';

export default {
    data(){
        return{
            uploadPreset:'mchzxehv',
            selectedFile: null,
            imageUrl: '',
            tags:'',
            folder:'',
            baseUrl: 'https://api.cloudinary.com/v1_1/dwqs04xan/upload/',

        }
    },
    methods:{
        onFileSelected(event){
            this.selectedFile = event.target.files[0]

            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result 
            })
            fileReader.readAsDataURL(this.selectedFile)
        },
        onUpload(){
            const fd = new FormData()
            fd.append('tags', this.tags.split(","))
            fd.append('file', this.selectedFile)
            fd.append('upload_preset', this.uploadPreset)
            fd.append('folder', this.folder)
                axios.post(this.baseUrl, fd,{
                })
                .then(res =>{
                    this.$store.dispatch('getPromise', res.data.secure_url)
                    console.log(res)
                })
                .then(
                     this.$router.push('/arrow/'+ this.folder))          
        },
    },
    computed:{
        isSelectedFileEmpty(){
                return this.selectedFile === null ? true : false;
            }
    },
    components:{
        appNavBar: NavBar,
    }
}
</script>

<style scoped>

</style>