<template>
    <v-container fluid fill-height>
        <v-row>
            <v-col class="col-4 offset-4">
            <v-form>
                
                <v-text-field
                v-model="length"
                label="Length"
                required></v-text-field>
                <v-textarea
                v-model="description"
                label="Description"
                required
                ></v-textarea>

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
                        <v-btn raised class="primary" @click="onUpload">Upload</v-btn>
                    </v-col>
                </v-row>

                <v-row >
                    <v-col>
                        <img :src="imageUrl" height="160">
                    </v-col>
                </v-row>

            </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            selectedFile: null,
            imageUrl: '',
            length:'',
            description:''

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
            fd.append('Description', this.description)
            fd.append('Length', this.length)
            fd.append('PhotoFile', this.selectedFile)
                this.$http.post('http://localhost:63085/api/Images', fd).
                    then(response =>{
                        this.$router.push('/arrow/'+response.data)
                    })            
        }
    }
}
</script>

<style scoped>

</style>