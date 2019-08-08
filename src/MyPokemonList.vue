<template lang="html">
  <div class="post" v-if="post">
    <h1 class="post__title">{{ post.title }}</h1>
    <p class="post__body">{{ post.body }}</p>
    <p class="post__id">{{ post.id }}</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['id'],
  data() {
    return {
      post: null,
      endpoint: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=200',
    }
  },
  watch: {
  '$route'() {
    this.getPost(this.name);
  }
},
  methods: {
  getPost(id) {
    axios(this.endpoint + id)
      .then(response => {
        this.post = response.data
      })
      .catch( error => {
        console.log(error)
      })
  }
},

created() {
  this.getPost(this.id);
},
}
</script>
