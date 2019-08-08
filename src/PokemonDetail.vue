<template lang="html">
  <div class="post" v-if="pokemon">
    <div class="modal" id="pocketmonster">
      <div class="modal-container">
        <h2><img src="assets/pocketicon.png" style="position: relative; vertical-align: middle;"/>
        Your Pokemon Pocket</h2>
        <div v-if="mypokemondetail.length > 0">
          <table>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Original name</th>
            </tr>
            <tr v-for="(value,propertyName) in mypokemondetail">
              <td><img :src="value.img" :title="propertyName" width="60" height="60"/></td>
              <td>{{ value.name }}</td>
              <td>{{ value.ori_name }}</td>
            </tr>
          </table>
        </div>
        <div v-else>
            <h3 style="text-align:center;">Your pocket is empty.</h3>
        </div>
      <a href="#modal-close" @click="ResetOpacity(0.5, true, 'block')" style="float:right">Close</a>
      </div>
    </div>
    <div :id="mypokemondetail.length > 0 ? 'pocket-shake' : 'pocket'">
      <a href="#pocketmonster" @click="setToTop">
      <img src="assets/pocket.png" />
      </a>
    </div>
    <h1 class="post__title icon-pokemon">{{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}</h1>
    <p class="post__body">
      <img id="emotion" :src="pokemon.sprites['front_default']" @click="tangkap(pokemon)" width="120" height="120" />
      Another form (click to flip):
      <div class="row">

  <div class="column-sprites" v-if="value" v-for="(value,propertyName) in pokemon.sprites">
  <img class="flipthis" :src="value" :title="propertyName" />
</div>
</div>

Height: {{ pokemon.height }}<br>
Weight: {{ pokemon.weight }}<br>
Abilities:
      <ul id="abilities">
        <li v-for="pok in pokemon.abilities">
          {{ pok.ability.name }}
        </li>
      </ul>
Types:
      <ul id="types">
        <li v-for="type in pokemon.types">
          {{ type.type.name }}
        </li>
      </ul>
Statistic:
      <ul id="stats">
        <li v-for="st in pokemon.stats">
          {{ st.stat.name }}: {{ st.base_stat }}
        </li>
      </ul>
Moves:
      <ul id="moves">
        <li v-for="mv in pokemon.moves">
          {{ mv.move.name }}
        </li>
      </ul>
    </p>
    <p class="post__id"></p>
  </div>
   <div class="post" v-else>
<center><img src="assets/pocket.png" class="pocket-bounces" />
<h4>Please wait....</h4></center>
</div>
</template>
<style>
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
* {
  box-sizing: border-box;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
@font-face {
  font-family: "Pokemon";
  src: url("/assets/Pokemon_Hollow.ttf") format("truetype");
}
h1.icon-pokemon {
  font-family: "Pokemon";
  font-weight: normal;
  font-style: normal;
}
img.flipthis:active {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
img {
  vertical-align: middle;
}
img.emotion:hover {
  src: url("/assets/pokeball.png") no-repeat;
}
p {
  margin-top: 0;
}
.modal-container {
  position: fixed;
  background-color: #fff;
  width: 70%;
  max-width: 80%;
  height: 80%;
  left: 50%;
  padding: 20px;
  z-index: 10;
  border-radius: 5px;
  -webkit-transform: translate(-50%, -200%);
  -ms-transform: translate(-50%, -200%);
  transform: translate(-50%, -200%);
  -webkit-transition: -webkit-transform 200ms ease-out;
  transition: transform 200ms ease-out;
}
.modal:before {
  content: "";
  z-index: 9;
  position: fixed;
  display: none;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.modal:target:before {
  display: block;
  z-index: 9;
}
.modal:target .modal-container {
  top: 5%;
  z-index: 9;
  -webkit-transform: translate(-50%, 0%);
  -ms-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
}
#modal-close {
}
</style>
<script>
import axios from "axios";
export default {
  props: ["name"],
  data() {
    return {
      moveSprites: false,
      mypokemondetail: [],
      pokemon: null,
      speed: 0,
      sprites: [],
      endpoint: "https://pokeapi.co/api/v2/pokemon/"
    };
  },
  watch: {
    $route() {
      this.getPokemon(this.name);
    }
  },
  methods: {
    tangkap(fokemon) {
      this.moveSprites = false;
      let foo = prompt("GOTCHA!! Input your pokemon name:");
      this.mypokemondetail.push({
        img: fokemon.sprites["front_default"],
        ori_name: fokemon.name,
        name: foo
      });
      this.ResetOpacity(0.5, true, "block");
      // (this.mypokemondetail)
    },
    ResetOpacity(val, movesprites, dis) {
      this.moveSprites = movesprites;
      document.getElementsByClassName("column-right")[0].style.opacity = val;
      document.getElementById("emotion").style.display = dis;
    },
    getPokemon(name) {
      this.pokemon = null;
      axios(this.endpoint + name)
        .then(response => {
          this.speed = 0;
          this.speed = parseInt(response.data.stats[0].base_stat) * 10;
          this.sprites = response.data.sprites;
          this.pokemon = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    setToTop() {
      // alert('tes')
      this.ResetOpacity(1, false, "none");
      setTimeout(function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }, 100);
    }
  },

  created() {
    this.getPokemon(this.name);
  },

  mounted() {
    const self = this;
    self.moveSprites = true;
    setTimeout(function() {
      setInterval(function() {
        if (self.moveSprites) {
          var x = Math.floor(Math.random() * self.speed);
          var y = Math.floor(Math.random() * self.speed);
          var obj = document.getElementById("emotion");
          obj.style.position = "absolute";
          obj.style.top = x + "px";
          obj.style.left = y + "px";
        }
      }, self.speed);
    }, 1000);
  }
};
</script>
