import { defineStore } from "pinia";
import { IComment } from 'src/models/post';


export const commentsAPI = defineStore("comments", {
  state: (): { comments: IComment[] } => {
    return {
      comments: [
        {
          id: 1,
          content:'Primer comentario test',
          stamp: '2023-01-07T15:00:000Z',
          autor: 'Andres Escorcia',
          fk_autor: 1,
          fk_post : 1,
        }
      ],
    };
  },
  actions: {
    deleteComment(id: number) {
      this.comments = this.comments.filter((comment) => comment.id !== id);
      return { message: "Comment Deleted", code: 200 };
    },
    registerComment(comment: IComment) {
      comment.id = this.comments.length + 1;
      this.comments.push(comment);
      return { data: { ...comment }, code: 200 };
    },
  },
  getters: {
    getComments: (state) => state.comments,
    getCommentByPostId: (state) => {
      return (id: number) =>
        state.comments.filter(
          (comment) => comment.fk_post === id );
    },
  },
});