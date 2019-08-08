<template>
  <div id="app">
    <header>
      <h1>Select your pokemon</h1>
    </header>
    <main>
      <aside class="sidebar">
        <div v-for="pokemon in pokemons">{{ pokemon.name }}</div>
      </aside>
      <div class="content"></div>
    </main>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      pokemons: null,
      endpoint: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=200"
    };
  },
  created() {
    this.getAllPosts();
  },
  methods: {
    getAllPosts() {
      axios
        .get(this.endpoint)
        .then(response => {
          this.pokemons = null
          this.pokemons = response.results;
        })
        .catch(error => {
          console.log("-----error-------");
          console.log(error);
        });
    }
  }
};
</script>
