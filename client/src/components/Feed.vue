<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
      <v-card>
          <v-card class="text-center" elevation="8">
            <v-card-title>
              <h3>Criar uma nova postagem</h3>
            </v-card-title>
            <v-card-text>
              <v-row justify="space-around">
                <v-col cols="3">
                  <v-textarea rows="1" variant="outlined" v-model="titulo" label="Título"/>
                </v-col>
                <v-col cols="8">
                  <v-textarea rows="1" variant="outlined" auto-grow v-model="texto" label="Texto"/>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn class="bg-secondary" block @click="this.criarPost">Criar!</v-btn>
            </v-card-actions>
          </v-card>
      </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8" v-for="post in posts" :key="post.id">
        <v-card hover elevation="8">
          <v-card-title>
            <v-icon size="lg">mdi-account</v-icon>
            {{ post.user.username }}
          </v-card-title>
          <v-card-subtitle>
            {{ post.titulo }} - {{ post.dataPost }}
          </v-card-subtitle>
          <v-card-text>
            {{ post.texto }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="9">
        <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "FeedPrincipal",

  data() {
    return {
      currentPage: 1,
      itemsPerPage: 15,
      totalPages: '',
      posts: this.posts,
      titulo: '',
      texto: '',
    }
  },


  mounted(){
    this.retrievePosts();
  },

  methods: {
    async retrievePosts() {
      try {
        let response = await axios.get('http://localhost:3000/api/posts/findAll')
        this.posts = response.data;
        this.posts.forEach(post => {

          let date = new Date(post.dataPost);
          let day = String(date.getDate()).padStart(2, '0'); // Ensure two digits for day
          let month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits for month
          let year = date.getFullYear();
          post.dataPost = `${day}/${month}/${year}`;
        });
      } catch (err) {
        await Swal.fire({
          icon: 'warning',
          title: 'Sem posts!',
          text: 'Não há posts.',
        });
      }
    },

    async criarPost(){
      try {
        await axios.post('http://localhost:3000/api/posts/create', {titulo: this.titulo, texto: this.texto, user: localStorage.getItem('username')})
        await Swal.fire({
          icon: 'success',
          title: 'Post criado!',
          timer: 3000,
        });
      } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Não foi possível criar seu post!',
        text: 'Tente novamente mais tarde!',
      });
    }
    }
  }
}

</script>

<style scoped>

</style>