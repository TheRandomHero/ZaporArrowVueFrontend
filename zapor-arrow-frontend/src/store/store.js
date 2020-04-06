import Vue from 'vue';
import Vuex from 'vuex';
import cookies from 'vue-cookies'

Vue.use(Vuex);
export const store = new Vuex.Store({
    state:{
        jwt:null,
        imageIdsForArrow:[],

    },
    getters:{
        isLoggedIn(){
            return cookies.isKey('token');
        },
        imageIdsForSpecArrow(state){
            return state.imageIdsForArrow;
        }

    },
    actions:{
        getImageIdsForArrow( {commit}, id){
            return Vue.http.get('http://localhost:63085/api/Images/getall/' + id)
                .then(response =>{
                    commit('SET_IMAGEIDSFORARROW', response.data)
                })
                .catch(error =>{
                    console.log(error);
                });
        }
    },
    mutations:{
        SET_IMAGEIDSFORARROW (state, ids){
            state.imageIdsForArrow = ids
            }
        }
})