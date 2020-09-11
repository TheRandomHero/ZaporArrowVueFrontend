<template>
    <v-container fluid>
        <v-row>
            <v-col cols="11" class="article-header">
                <v-text-field
                v-model="title">

                </v-text-field>
            </v-col>
            <v-col cols="1">
                <v-textarea
                v-model="context">
                    
                </v-textarea>

            </v-col>
        </v-row>
        <v-row>
            <v-col cols="10" offset="1">
                <div class="article-context">{{article.context}}</div>
            </v-col>
        </v-row>
    </v-container>    
</template>
<script>
export default {
    date(){
        return{
            title:'',
            context:'',
        }
    }
    
}
</script>

<style scoped>

</style>