<template>
    <v-container>
        <app-nav-bar></app-nav-bar>
        <v-btn color="error"
                @click="deleteArrow"
        >Delete Arrow</v-btn>
        <v-row >
            <v-col cols="8" class="gallery-container">
                <div v-for="imgId in imageIdsForSpecArrow" :key="imgId"  class="image-container">
                    <v-fab-transition>
                        <v-btn
                        class="btn-fix"
                        color="red"
                        absolute
                        top
                        right
                        fab
                        @click.stop="deleteImage(imgId)">
                            <v-icon>fas fa-trash-alt</v-icon>
                        </v-btn>
                    </v-fab-transition>
                   <v-img :src="'http://localhost:63085/api/Images/' + imgId" class="gallery-image"></v-img>
                </div>
            </v-col>
            <v-col cols="4">
                <v-sheet elevation="12">
                    <v-textarea 
                    v-model="arrow"
                    label="Arrow Description"
                    no-resize
                    rounded
                    clearable
                    clear-icon="fas fa-times-circle"></v-textarea>
                    <v-btn class="primary" @click="editDescription">Edit description</v-btn>
                </v-sheet>
            </v-col>
        </v-row>
        <!-- upload another image to arrow -->
        <v-row> 
            <v-col>
                <input type="file" 
                        style="display: none" 
                        ref="fileInput" 
                        accept="image/*"
                        @change="onFileSelected">
                <v-btn raised class="primary" @click="$refs.fileInput.click()" >Select file</v-btn>
                <v-btn raised class="primary" @click="onUpload">Upload</v-btn>
            </v-col>
        </v-row>

        <v-row >
            <v-col>
                <img :src="imageUrl" height="160">
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import NavBar from './../components/NavBar';
import { mapGetters } from 'vuex'
    export default {
        props: ['id'],

        data() {
            return {
                arrow:"",
                selectedFile: null,
                imageUrl: '',
                
            }
        },
        mounted(){
            this.$http.get('http://localhost:63085/api/Arrow/arrowDescription/' + this.id)
            .then(response => {
                return response.json();
            })
            .then(data =>{
                this.arrow = data['description'];
            });
            this.$store.dispatch("getImageIdsForArrow", this.id)
           
        },
        computed:{
            ...mapGetters([
                'imageIdsForSpecArrow'
            ])
        },
        methods:{
            deleteArrow(){
                this.$http.delete('http://localhost:63085/api/Arrow/',{
                    headers:{
                        'Content-type' : 'application/json',
                        'Authorization' : 'Bearer ' + this.$cookies.get('token')
                    },
                    params:{"arrowId": this.$route.params.id}
                })
                .then(this.$router.push({name:'gallery'}))
            },

            deleteImage(deletingId){
               this.$store.dispatch("deleteImage", deletingId)
                
            },
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
                fd.append('file', this.selectedFile)
                    this.$http.post('http://localhost:63085/api/Images/' + this.id, fd,{
                        headers:{
                            Authorization : 'Bearer ' + this.$cookies.get('token')
                        },
                    })
                    .then(response=>{
                        this.$store.dispatch("updateImages", response.data),
                        this.imageUrl = "",
                        this.selectedFile = null;

                    })
            },
            editDescription(){
                const fd = new FormData();
                fd.append('Description', this.arrow)
                this.$http.put('http://localhost:63085/api/Arrow/' + this.id, fd,{
                    headers:{
                            Authorization : 'Bearer ' + this.$cookies.get('token')
                        },
                })
            }
        },
        components:{
            appNavBar: NavBar,
        }
    }
</script>

<style scoped>
    .gallery-container{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .image-container{
        display: flex;
        position: relative;
        max-width: 250px;

    }
    .gallery-image{
        width: 100%;
        z-index: 1;
    }
    .btn-fix:focus::before {
        z-index: 15;
        opacity: 0 !important;
    }
    
</style>