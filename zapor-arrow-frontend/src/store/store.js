import Vue from 'vue';
import Vuex from 'vuex';
import cookies from 'vue-cookies'

Vue.use(Vuex);
export const store = new Vuex.Store({
    state:{
        jwt:null,
        ids:null,
        imageIdsForArrow:[],

    },
    getters:{
        isLoggedIn(){
            return cookies.isKey('token');
        },
        imageIdsForSpecArrow(state){
            return state.imageIdsForArrow;
        },
        getGalleryImagesIds(state){
            return state.ids;
        },

    },
    actions:{
        getImageIdsForArrow( {commit}, id){
            return new Promise((resolve, reject) =>{
                Vue.http.get(process.env.VUE_APP_URL + '/api/Images/getall/' + id)
                    .then(response =>{
                        resolve(
                            commit('SET_IMAGEIDSFORARROW', response.data)
                        )
                    })
                    .catch(error =>{
                        reject(error);
                    });
                
            }) 
        },
        getGalleryImages( { commit } ){
            Vue.http.get(process.env.VUE_APP_URL + '/api/gallery')
            .then(response => {
                commit('SET_IMAGESIDSFORGALLERY', response.data)
            })
        },


        updateImages({commit}, payload){
            commit('SET_IMAGEIDSFORARROW', payload)
        },
        
        deleteImage({commit}, id){
            Vue.http.delete(process.env.VUE_APP_URL + '/api/Images/',{
                headers:{
                    'Content-type' : 'application/json',
                    'Authorization': 'Bearer ' + cookies.get('token')
                },
                params:{"imageId" : id}
            })
            .then(
                commit('DELETE_IMAGE', id))
        }
    },
    mutations:{
        DELETE_IMAGE (state, id){
            function findIndex(object, value){
                return Object.keys(object).find(key=> object[key] === value)
            }
            var index = findIndex(state.imageIdsForArrow, id);
            state.imageIdsForArrow.splice(index, 1)
        },

        SET_IMAGEIDSFORARROW (state, payload){
            state.imageIdsForArrow = payload
            },


        SET_IMAGESIDSFORGALLERY(state, payload){
            state.ids = payload
            }
        },

})