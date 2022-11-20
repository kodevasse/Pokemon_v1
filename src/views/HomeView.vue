<script setup>
import { reactive, computed } from "vue";
import axios from "axios";
const state = reactive({
  pokemons: [],
  filteredPokemon: computed(() => updatePokemon()),
  text: "",
  urlIdLookup: {},
});

const fetchPokemon = () => {
  axios.get("https://pokeapi.co/api/v2/pokemon?limit=10").then((response) => {
    state.pokemons = response.data.results; // 👈 get just results
  });
};

fetchPokemon();

// 👇 function to get index
const getPokemonId = (item) => {
  return state.pokemons.findIndex((p) => p.name === item);
};

function updatePokemon() {
  if (!state.text) {
    return state.pokemons;
  }
  return state.pokemons.filter((pokemon) => pokemon.name.includes(state.text));
}
// 👇 return new function
</script>

<template>
  <div class="p-2 h-full">
    <div id="demo">
      <div class="w-full flex justify-center">
        <input
          placeholder="Search pokemon here..."
          type="text"
          class="input my-5 p-2 border-fuchsia-300 border-2"
          v-model="state.text"
        />
      </div>
      <div class="flex flex-row flex-wrap gap-3 justify-center">
        <div
          v-for="pokemon in state.filteredPokemon"
          class="w-28 h-36 border-teal-100 bg-gray-900 border rounded-md justify-center flex flex-col hover:bg-gray-800 transition-all cursor-pointer hover:scale-105"
        >
          <div class="flex flex-col -mt-3">
            <h1 class="text-fuchsia-300 mx-auto">{{ pokemon.name }}</h1>
            <span class="mx-auto -mt-1"
              >#{{ getPokemonId(pokemon.name) + 1 }}</span
            ><img
              class="-mb-3 w-24 mx-auto"
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                getPokemonId(pokemon.name) + 1
              }.png`"
            />
          </div>
        </div>
      </div>

      <!-- <div class="mt-10 p-4 flex flex-wrap justify-center">
        <div
          class="ml-4 text-2xl text-blue-400"
          v-for="(pokemon, i) in state.filteredPokemon"
          :key="i"
        > -->
      <!-- // 👇 call function to get index -->
      <!-- <router-link :to="`/about/${getPokemonId(pokemon.name)}`">
            {{ pokemon.name }} - id {{ getPokemonId(pokemon.name) }}
          </router-link>
        </div>
      </div> -->
    </div>
  </div>
</template>
