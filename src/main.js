import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Post from './Post.vue'
import Hello from './Hello.vue'
import PokemonList from './PokemonList.vue'
import PokemonDetail from './PokemonDetail.vue'
import MyPokemonList from './MyPokemonList.vue'
Vue.use(Router)

const router = new Router({
 routes: [
   {
     path: '/',
     name:'PokemonList',
     component: PokemonList,
   },
   {
     path: '/pokemon/:name',
     name: 'PokemonDetail',
     component: PokemonDetail,
     props: true,
   },
   {
    path: '/MyPokemonList',
    name: 'MyPokemonList',
    component: MyPokemonList,
    props: true,
  },
 ]
})

new Vue({
 el: '#app',
 render: h => h(App),
 router
})
