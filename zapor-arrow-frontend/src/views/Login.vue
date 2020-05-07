<template>
    <v-container fluid>
        <app-nav-bar />
        <v-row>
            <v-col class="col-4 offset-4">
                <v-form>
                    
                    <v-text-field
                    :append-icon="'fas fa-id-badge'"
                    v-model="username"
                    :rules="[rules.required, rules.min]"
                    label="Username"
                    required></v-text-field>

                    <v-text-field
                    :append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'"
                    :type="show ? 'text' : 'password'"
                    :rules="[rules.required, rules.min]"
                    hint="At least 8 characters"
                    v-model="password"
                    label="Password"
                    @click:append="show = !show"
                    required
                    ></v-text-field>

                    <v-row> 
                        <v-col>
                            <v-btn raised class="primary" @click="submit" >Submit</v-btn>
                        </v-col>
                        <v-col>
                            <v-btn raised class="primary" @click="clear">Clear fields</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import NavBar from './../components/NavBar';
 
export default {
    data(){
        return{
            username: '',
            password: '',
            show: false,
            baseUrl: process.env.VUE_APP_ROOT_API,
            rules:{
                required : value => !!value || 'Required.',
                min : v=> v.length >= 8 || 'Min 8 characters required.'
            }
        }
    },
    methods:{
      submit(){
          const fd = new FormData();
          fd.append('username', this.username)
          fd.append('password', this.password)
          this.$http.post(this.baseUrl + '/api/Account', fd)
            .then(response =>{
                this.$cookies.set('token', response.data['token'])
                this.$router.push('/gallery')
            })
      },
      clear(){
          this.username = "",
          this.password = ""
      }
    },
    components:{
        appNavBar: NavBar
    }
}
</script>
<style scoped>

</style>