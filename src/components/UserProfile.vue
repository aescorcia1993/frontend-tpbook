<template>
     <div class="q-pa-lg" style="width: clamp(600px,100%,100%)">

       <div class="row justify-start">
           <div class="col-auto">
             <q-avatar class="centered-h" size="200px" font-size="82px">
               <img :src="profile?.picture || defaultPhoto  ">
             </q-avatar>
           </div>
         <div class="col-auto centered-v q-ml-lg">
           <div class="text-h3">
               {{ user.name }}
           </div>
           <div class="text-h5">
            <q-icon name="phone"></q-icon>  {{ user.celular }}
           </div>
           <div class="text-h5">
             <q-icon name="email"></q-icon> {{ user.correo }}
           </div>
         </div>

       </div>

       <div class="row justify-start bg-grey-6 rounded-borders header-height q-pa-sm q-mt-lg centered-v q-gutter-sm">
         <q-btn icon="edit"  :label="isEditMode?'Save':'Edit'" color="blue" class="header-btn" @click="editProfile()">
         </q-btn>
         <q-btn icon="email"  label="Posts" color="blue" class="header-btn">
         </q-btn>
         <q-btn icon="message"  label="Comments" color="blue" class="header-btn">
         </q-btn>
       </div>

       <div class="q-pa-md ">

         <q-form
           class="q-gutter-md"
         >
           <div class="row justify-start q-gutter-lg">
             <q-input
               class="col-5"
               filled
               v-model="profile.description"
               label="Description"
               hint="Tell them about you"
               lazy-rules
               :rules="[ val => val && val.length > 0 || 'Please type something']"
               :readonly = "!isEditMode"
             />

             <q-input
               class="col-5"
               filled
               v-model="profile.birthdate"
               label="Your birthdate *"
               lazy-rules
               :readonly = "!isEditMode"
               :rules="[
          val => val !== null && val !== '' || 'Please type your birthdate']"
             />

             <q-input
               class="col-5"
               filled
               v-model="profile.city"
               label="Your City *"
               lazy-rules
               :readonly = "!isEditMode"
               :rules="[
          val => val !== null && val !== '' || 'Please type your City']"
             />

             <q-input
               class="col-5"
               filled
               v-model="profile.country"
               label="Your Country *"
               lazy-rules
               :readonly = "!isEditMode"
               :rules="[
          val => val !== null && val !== '' || 'Please type your Country']"
             />

             <q-input
               class="col-5"
               filled
               v-model="profile.gender"
               label="Your Gender *"
               lazy-rules
               :readonly = "!isEditMode"
               :rules="[
          val => val !== null && val !== '' || 'Please type your Gender']"
             />

             <q-input
               class="col-5"
               filled
               v-model="profile.job"
               label="Your Job *"
               lazy-rules
               :readonly = "!isEditMode"
               :rules="[
          val => val !== null && val !== '' || 'Please type your Job']"
             />

             <q-input
               class="col-5"
               filled
               v-model="profile.picture"
               label="Your Picture *"
               lazy-rules
               :readonly = "!isEditMode"
               :rules="[
          val => val !== null && val !== '' || 'Please type your Picture']"
             />
           </div>

         </q-form>

       </div>

     </div>
</template>

<script lang="ts">

import { defineComponent, onBeforeMount, PropType, ref, watch } from "vue";
import { userI } from "../models/user";
import { profileI } from "../models/profile";
import fetch from "../helpers/fetch";
import { useQuasar } from "quasar";
import { useUserStore } from "../stores/user";


export default defineComponent({
  name: "UserProfile",
  components:{

  } ,
  setup(context){
    const userStore = useUserStore();
    const newProfile = {
      profile_user: userStore.$state.user?.idusuario,
      description:"",
      birthdate:"",
      city: "",
      country:"",
      gender:"",
      job:"",
      picture:""
    }
    let profile = ref<profileI | null>(newProfile);
    let isEditMode = ref<boolean>(false);
    let originalProfile = ref<profileI | null>(null);
    let user = ref<userI | null>(userStore.$state.user);
    const $q = useQuasar();
    let isNew = false;

    onBeforeMount(()=>{

      fetch.get(`profile/get/${userStore.$state.user?.idusuario}`).then((res:any) =>{
        if (res === null){
          $q.dialog({
            title: "Profile",
            message:"Profile not found"
          })
          isNew = true;
          profile.value = newProfile;
        }else{
          profile.value = res;
          originalProfile.value = {...res};
        }

      }).catch(err =>{
         console.log("User without Profile")
      })
    })

    function editProfile(){
      if (isEditMode.value === true){
        if (isNew === true){
          create();
          isNew = false;
        }else{
          save();
        }
        isEditMode.value = false;
      }else{
        isEditMode.value = true;
      }
    }
    function save(){
      fetch.put("profile/update",profile.value).then(res=>{
        $q.notify({
          message:"Profile Updated",
          color:"green",
          textColor:"white"
        })
      });
    }
    function create(){
      fetch.post("profile/register",profile.value).then(res=>{
        $q.notify({
          message:"Profile Created",
          color:"green",
          textColor:"white"
        })
      });
    }

    let defaultPhoto = 'https://www.seekpng.com/png/full/115-1150053_avatar-png-transparent-png-royalty-free-default-user.png'
    return{
      profile,
      isEditMode,
      editProfile,
      defaultPhoto,
      user
    }
  }
});
</script>

<style lang="scss" scoped>

</style>