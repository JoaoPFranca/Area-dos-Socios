<template>
  <v-container v-if="post">
    <v-row justify="center">
      <v-col cols="8">
        <v-card outlined hover elevation="8">
          <v-card-title>
            <v-icon size="lg">
              mdi-account
            </v-icon>
            {{ post.user ? post.user.username : 'Unknown' }}
          </v-card-title>
          <v-card-subtitle class="text-h6 pb-5">
            {{ post.titulo }} - {{ post.dataPost }}
          </v-card-subtitle>
          <v-card-text class="text-h5 pb-7">
            {{ post.texto }}
          </v-card-text>
          <v-divider/>
        </v-card>
          <v-card class="mt-2">
            <v-responsive class="mx-auto pl-8" max-width="344">
              <v-col cols="12">
                <v-textarea v-model="commentText" rows="1" append-icon="mdi-send" label="Responder" variant="outlined" auto-grow @click:append="sendMessage"></v-textarea>
              </v-col>
            </v-responsive>
          </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="7" v-for="comment in comments" :key="comment.id">
        <v-card hover elevation="8">
          <v-card-title>
            <v-row>
              <v-col cols="11">
                <v-icon size="lg">mdi-account</v-icon>
                {{ comment.user.username }}
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-subtitle>
            {{ comment.dataComment }}
          </v-card-subtitle>
          <v-card-text>
            {{ comment.texto }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <div v-else>
    Loading post...
  </div>
</template>

<script>

import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "CommentsFeed",

  data() {
    return {
      comments: this.comments,
      post: this.post,
      commentText: this.commentText,
    }
  },

  mounted() {
    this.retrievePost();
    this.retrieveComments();
  },

  methods: {
    async retrievePost() {
      let url = window.location.href
      const parts = url.split("/");
      const postId = parts[parts.length - 1];

      try {
        let response = await axios.get(`http://localhost:3000/api/posts/findOne/${postId}`)
        this.post = response.data
        let date = new Date(this.post.dataPost);
        let day = String(date.getDate()).padStart(2, '0'); // Ensure two digits for day
        let month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits for month
        let year = date.getFullYear();
        this.post.dataPost = `${day}/${month}/${year}`;

      } catch (err) {
        await Swal.fire({
          icon: 'error',
          title: 'This post doesnt exists!',
          text: 'We werent able to find the posts! Try again!',
        });
      }
    },
    async sendMessage() {
      let url = window.location.href
      const parts = url.split("/");
      const postId = parts[parts.length - 1];
      try {
        await axios.post('http://localhost:3000/api/comments/create', {texto: this.commentText, postId: postId, user: localStorage.getItem('username')})
        await Swal.fire({
          icon: 'success',
          title: 'Comment successfully posted!',
          timer: 3000,
        });
      } catch (err) {
        await Swal.fire({
          icon: 'error',
          title: 'It wasnt possible to make the comment :/',
          text: 'We werent able to post that comment. Try again later.',
        });
      }
    },
    async retrieveComments(){
      let url = window.location.href
      const parts = url.split("/");
      const postId = parts[parts.length - 1];
      try {
        let response = await axios.get(`http://localhost:3000/api/comments/findAll/${postId}`)
        this.comments = response.data
        this.comments.forEach(comment => {

          let date = new Date(comment.dataComment);
          let day = String(date.getDate()).padStart(2, '0'); // Ensure two digits for day
          let month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits for month
          let year = date.getFullYear();
          comment.dataComment = `${day}/${month}/${year}`;
        });

      } catch (err) {
        await Swal.fire({
          icon: 'error',
          title: 'This post doesnt exists!',
          text: 'We werent able to find the post! Try again!',
        });
      }
    }
  }
}

</script>

<style scoped>

</style>