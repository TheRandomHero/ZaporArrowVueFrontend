import Vue from 'vue';
import Vuex from 'vuex';
import cookies from 'vue-cookies'

Vue.use(Vuex);
export const store = new Vuex.Store({
    state:{
        jwt:null,
        ids:null,
        imageIdsForArrow:[],
        user:{
            loggedIn: false,
            data:null,
        }

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
        //firebase getters
        user(state){
            return state.user
        }

    },
    actions:{
        getImageIdsForArrow( {commit}, id){
            return new Promise((resolve, reject) =>{
                Vue.http.get('https://zaporarrowapi.azurewebsites.net/api/Images/getall/' + id)
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
            Vue.http.get('https://zaporarrowapi.azurewebsites.net/api/gallery')
            .then(response => {
                commit('SET_IMAGESIDSFORGALLERY', response.data),
                console.log(response.data)
            })
        },


        updateImages({commit}, payload){
            commit('SET_IMAGEIDSFORARROW', payload)
        },

        deleteImage({commit}, id){
            Vue.http.delete('https://zaporarrowapi.azurewebsites.net/api/Images/',{
                headers:{
                    'Content-type' : 'application/json',
                    'Authorization': 'Bearer ' + cookies.get('token')
                },
                params:{"imageId" : id}
            })
            .then(
                commit('DELETE_IMAGE', id))
        },
        //firebase actions
        fetchUser({ commit }, user){
            commit('SET_LOGGED_IN', user !==null, {root : true});
            if(user){
                commit('SET_USER',{
                    displayName: user.displayName,
                    email: user.email
                });
            } else {
                commit('SET_USER', null, {root:true});
            }
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
            },
        //firebase auth
        SET_LOGGED_IN(state, value){
            state.user.loggedIn = value;
        },
        SET_USER(state, data){
            state.user.data = data;
        }
        },

})