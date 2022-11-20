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
  axios.get("https://pokeapi.co/api/v2/pokemon?offset=0").then((response) => {
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
    return [];
  }
  return state.pokemons.filter((pokemon) => pokemon.name.includes(state.text));
}
// 👇 return new function
</script>

<template>
  <div class="p-2 h-full">
    <div class="flex flex-row flex-wrap gap-4">
      <div
        v-for="pokemon in state.pokemons"
        class="w-28 h-32 bg-gray-700 rounded-md"
      >
        {{ pokemon.name }} {{ getPokemonId(pokemon.name) }}
      </div>
    </div>

    {{ state.filteredPokemon }}
    <div id="demo">
      <div class="w-full flex justify-center">
        <input
          placeholder="Enter Pokemon here"
          type="text"
          class="input mt-10 p-2 border-blue-500 border-2"
          v-model="state.text"
        />
      </div>
      <div class="mt-10 p-4 flex flex-wrap justify-center">
        <div
          class="ml-4 text-2xl text-blue-400"
          v-for="(pokemon, i) in state.filteredPokemon"
          :key="i"
        >
          <!-- // 👇 call function to get index -->
          <router-link :to="`/about/${getPokemonId(pokemon.name)}`">
            {{ pokemon.name }} - id {{ getPokemonId(pokemon.name) }}
          </router-link>
        </div>
      </div>
      <button class="btn btn-warning" @click="updatePokemon()">
        UpdatePokemon
      </button>
    </div>
  </div>
</template>
