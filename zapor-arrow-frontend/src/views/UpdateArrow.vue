<template>
    <v-container fluid>
        <v-row width="100%">
            <app-nav-bar :bg="image"/>
        </v-row>
        <v-row >
            <v-col class="gallery-container lg-cols-6">
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
                   <v-img :src="baseUrl + '/api/Images/' + imgId" class="gallery-image"></v-img>
                </div>
            </v-col>
            <v-col class="lg-cols-6">
                <v-sheet elevation="12" class="description-textarea">
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
            <v-col class="ml-8">
                <input type="file" 
                        style="display: none" 
                        ref="fileInput" 
                        accept="image/*"
                        @change="onFileSelected">
                <v-btn raised class="primary ma-2" @click="$refs.fileInput.click()" >Select file</v-btn>
                <v-btn raised class="primary" @click="onUpload" :disabled="isSelectedFileEmpty">Upload</v-btn>
                
            </v-col>
        </v-row>

        <v-row justify="center" align-content="center">
            <v-col class="ml-5">
                <v-img :src="imageUrl" max-height="400" max-width="400" class="ma-5"> </v-img>
                <v-btn color="error"
                @click="deleteArrow"
                >Delete Arrow</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import NavBar from './../components/NavBar';
import background from './../assets/gallery-bg.jpg'
import { mapGetters } from 'vuex'
    export default {
        props: ['id'],

        data() {
            return {
                arrow:"",
                selectedFile: null,
                imageUrl: '',
                image:background,
                baseUrl: process.env.VUE_APP_ROOT_API,
                
            }
        },
        mounted(){
            this.$http.get(this.baseUrl + '/api/Arrow/arrowDescription/' + this.id)
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
            ,
            isSelectedFileEmpty(){
                return this.selectedFile === null ? true : false;
            }
        },
        methods:{
            deleteArrow(){
                if(confirm('Are you sure want to delete this Arrow?'))
                    this.$http.delete(this.baseUrl + '/api/Arrow/',{
                        headers:{
                            'Content-type' : 'application/json',
                            'Authorization' : 'Bearer ' + this.$cookies.get('token')
                        },
                        params:{"arrowId": this.$route.params.id}
                    })
                    .then(this.$router.push({name:'gallery'}))
                    .then(
                        this.$store.dispatch('getGalleryImages')
                    )
            },

            deleteImage(deletingId){
                if(confirm('Are you sure want to delete this Image?'))
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
                    this.$http.post(this.baseUrl + '/api/Images/' + this.id, fd,{
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
                this.$http.put(this.baseUrl + '/api/Arrow/' + this.id, fd,{
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
    .container{
        padding: 0;
    }
    .gallery-container{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .image-container{
        display: flex;
        position: relative;
        max-width: 250px;
        margin: 10px;

    }
    .gallery-image{
        width: 100%;
        z-index: 1;
    }
    .btn-fix:focus::before {
        z-index: 15;
        opacity: 0 !important;
    }
    .description-textarea{
        margin-right: 50px;
    }
    
</style>