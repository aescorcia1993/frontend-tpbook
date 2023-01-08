import { defineStore } from "pinia";
import { IPost } from 'src/models/post';

export const postsAPI = defineStore("posts", {
  state: (): { posts: IPost[] } => {
    return {
      posts: [
        {
          id: 1,
          author:1,
          stamp: '2023-01-07T20:04:000Z',
          content:'Bienvenidos al Post de Test',
          likes:'25',
          comments:[]
        }
      ],
    };
  },
  actions: {
    deletePost(id: number) {
      this.posts = this.posts.filter((post) => post.id !== id);
      return { message: "Post Deleted", code: 200 };
    },
    registerPost(post: IPost) {
      post.id = this.posts.length + 1;
      this.posts.push(post);
      return { data: { ...post }, code: 200 };
    },
  },
  getters: {
    getPosts: (state) => state.posts,
    getPostById: (state) => {
      return (id: number) =>
        state.posts.find(
          (post) => post.id === id );
    },
  },
});