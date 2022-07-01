<template>
      <div class="q-ma-lg container" >
         <q-card class="post q-pa-sm q-ma-md"  v-for="(post,index) in posts" :key="post.idpublications">
           <div class="text-h5 q-ml-xl"> {{ post.content }}</div>
           <div class="text-h6 q-ml-xl">{{ post.author }} - {{ post.date + '  -   ' + post.hour }}</div>
           <div class="text-h6 q-ml-xl">{{ post.likes }} <q-icon name="favorite" color="red" @click="like()"></q-icon>  </div>
           <div class="comments" v-for="comment in post.comments">
                <div class="text-h5 ">
                   {{ comment.content }}
                </div>
             <div class="text-h6">
               {{ comment.autor}} - {{comment.stamp}}
             </div>
           </div>
           <div class="q-ma-lg">
               <div class="row justify-center q-gutter-lg q-mt-lg">
                 <q-input
                   class="col-6"
                   v-model="phone"
                   color="black"
                   debounce="500"
                   label="New Comment"
                 />
                 <q-btn
                   class="col-2"
                   icon="send"
                   label="Post"
                   @click="posting()"
                 >
                 </q-btn>
               </div>

           </div>
         </q-card>
      </div>
</template>

<script lang="ts">

import { defineComponent, onBeforeMount, onMounted, onUnmounted, onUpdated, ref, watch } from "vue";
import { postI } from "../models/post";
import fetch, { post } from "../helpers/fetch";

export default defineComponent({
  name: "VenueDataImporter",
  components:{

  } ,
  props:{

  },
  setup(props,context){
    let posts = ref<postI[]>(null);
//ref
//lifecycles
    onBeforeMount(()=>{
      // fetch.get("post/getAll").then(res=>{
      //   posts.value = res;
      // })

      posts.value = [
        { idpublications:25,
          author:"Andres Escorcia",
          date:"21/09/1993",
          hour:"12:00",
          content:"El agua es vida",
          likes:20,
          comments: [
            {
              id: 1,
              content:"Me parece genial",
              stamp: "21-09-2022 - 12:00",
              autor: "Juan Pelaez",
              fk_post : 25
            },
            {
              id: 2,
              content:"Me parece genial",
              stamp: "17-09-2022 - 21:00",
              autor: "Melissa Alvarez",
              fk_post : 25
            },
          ]

        },
        { idpublications:22,
          author:"Luis Carlos Escorcia",
          date:"21/09/1993",
          hour:"12:00",
          content:"El agua es vida",
          likes:20
        },
        { idpublications:12,
          author:1,
          date:"21/09/1993",
          hour:"12:00",
          content:"El agua es salud",
          likes:20
        },
      ]
    })
    onMounted(()=>{

    })
    onUpdated(()=>{

    })
    onUnmounted(()=>{

    })
//computed
//methods
//event called from children
//watchers
//event exposed
    context.expose({})

    return{
      posts,
      posting(){
        alert("Post")
      },
      like(){
        alert("like")
      }
//ref
//computed
//methods
//event called from children
//watchers
//event exposed

    }
  }
});
</script>

<style lang="scss" scoped>
.post{
  box-shadow: 1px 2px 2px 2px gray;
  border-radius: 60px !important;
}
.comments{
  box-shadow: 1px 2px 2px 2px gray;
  border-radius: 20px !important;
  margin-top: 15px;
  background-color: #1a87a0;
  color: white;
  padding: 10px;
  width: 50%;
  margin-left: 50%;
}

.container{
  overflow-y: auto;
}
</style>