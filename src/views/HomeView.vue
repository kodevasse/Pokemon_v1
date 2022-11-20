<script setup>
import { reactive, computed, ref } from "vue";
import { useStorage } from "@vueuse/core";
import Pokemon from "@/components/modals/Pokemon.vue";
import axios from "axios";

const state = reactive({
  pokemons: [],
  filteredPokemon: computed(() => updatePokemon()),
  selectedPokemon: [],
  text: "",
  urlIdLookup: {},
});

const fetchPokemon = () => {
  if (localStorage.Pokemons) {
    // Load Pokémons from Local Storage if possible
    let localPokemons = localStorage.getItem("Pokemons");
    let obj = JSON.parse(localPokemons);
    obj.results.forEach((pokemon) => {
      state.pokemons.push(pokemon);
    });
    console.log("Pokémons loaded from Local Storage");
  } else {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=25").then((response) => {
      console.log("Pokémons fetched from API");
      const pokemonJSON = JSON.stringify(response.data);
      localStorage.setItem("Pokemons", pokemonJSON); // Save Pokémon data to Local Storage
      console.log("Pokémons saved to Local Storage");
      localStorage.setItem("Pokemons", pokemonJSON); // Save Pokémon data to Local Storage
      state.pokemons = response.data.results; // 👈 get just results
    });
  }
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

const selectPokemon = (pokemon) => {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
    .then((response) => {
      console.log(response.data);

      state.selectedPokemon = response.data; // 👈 get just results
    });
};
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
        <label
          for="my-modal-4"
          v-for="pokemon in state.filteredPokemon"
          class="w-28 h-36 border-teal-100 bg-gray-900 border rounded-md justify-center flex flex-col hover:bg-gray-800 transition-all cursor-pointer hover:scale-105"
          @click="selectPokemon(pokemon)"
        >
          <!-- The button to open modal -->

          <div class="flex flex-col -mt-3">
            <h1 class="text-fuchsia-300 mx-auto">{{ pokemon.name }}</h1>
            <span class="mx-auto -mt-1"
              >#{{ getPokemonId(pokemon.name) + 1 }}</span
            ><NwImg
              class="-mb-3 w-24 mx-auto"
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                getPokemonId(pokemon.name) + 1
              }.png`"
              alt="Picture of pokemon"
            />
          </div>
        </label>
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
  <Pokemon :pokemon="state.selectedPokemon"></Pokemon>
</template>
