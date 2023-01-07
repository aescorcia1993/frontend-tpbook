import { defineStore } from "pinia";
import { IUser } from "../models/User";

export const useUserStore = defineStore("user",{
    state: ():{isLogged:boolean, user:IUser | null, profile:any} => {
         return {
           isLogged: false,
           user: null,
           profile: null
         };
    },
    actions:{
        logout(val?){
              this.isLogged = false;
              this.user = null;
        }
    },
    getters:{
        getUser: (state) => state.user,
   },
})

export const useUsersStore = defineStore("users", {
  state: (): { users: IUser[] } => {
    return {
      users: [
        {
          id: 1,
          name: "andres",
          password: "1234",
          correo: "escorciaingmecanica@gmail.com",
          celular: "3174918710",
          direccion: "cr 29 cll 65 #125",
          sesion: "admin",
        },
        {
          id: 2,
          name: "mario",
          password: "1234",
          correo: "mario@gmail.com",
          celular: "305552748",
          direccion: "cr 29 cll 65 #125",
          sesion: "admin",
        },
      ],
    };
  },
  actions: {
    deleteUser(id: number) {
      this.users = this.users.filter((user) => user.id !== id);
      return { message: "User Deleted", code: 200 };
    },
    registerUser(user: IUser) {
      user.id = this.users.length + 1;
      this.users.push(user);
      return { data: { ...user }, code: 200 };
    },
  },
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => {
      return (name: string, password: string) =>
        state.users.find(
          (user) => user.name === name && user.password === password
        );
    },
  },
});