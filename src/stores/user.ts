import { defineStore } from "pinia";
import { user, userI } from "../models/user";

export const useUserStore = defineStore("user",{
    state: ():{isLogged:boolean, user:userI | null} => {
         return {
           isLogged: false,
           user: null
         };
    },
    actions:{
        increment(val){
              this.isLogged = val;
        },
        decrement(val){
              this.isLogged = val;
        }
    },
    getters:{
        getUser: (state) => state.user,
   },
})