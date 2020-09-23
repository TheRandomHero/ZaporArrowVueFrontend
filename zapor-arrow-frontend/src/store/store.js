import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export const store = new Vuex.Store({
    state:{
        ids:null,
        user:{
            loggedIn: false,
            data:null,
        },
        promiseData:{
            imageUrl:null,
            mainTag:null,
        }

    },
    getters:{
        //firebase getters
        user(state){
            return state.user
        },
        promiseData(state){
            return state.promiseData
        }
        

    },
    actions:{
        //firebase actions
        fetchUser({ commit }, user){
            commit('SET_LOGGED_IN', user !==null);
            if(user){
                commit('SET_USER',{
                    displayName: user.displayName,
                    email: user.email
                });
            } else {
                commit('SET_USER', null, {root:true});
            }
        },
        //upload
        getPromise({commit}, imageUrl){
            commit('SET_PROMISE_DATA', imageUrl)
        }
    },
    mutations:{
        //firebase auth
        SET_LOGGED_IN(state, value){
            state.user.loggedIn = value;
        },
        SET_USER(state, data){
            state.user.data = data;
        },
        //after upload 
        SET_PROMISE_DATA(state, imageUrl){
            state.promiseData.imageUrl = imageUrl
        }
    },

})